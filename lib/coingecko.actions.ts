'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_API_ENDPOINT_PRO;
const API_KEY = process.env.COINGECKO_API_PRO_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      'x-cg-pro-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${
        errorBody.error || response.statusText
      } `
    );
  }

  return response.json();
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      '/onchain/search/pools',
      { query: id }
    );

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  try {
    // Fetch 1: Get search results with coin names and metadata
    const searchResults = await fetcher<{
      coins: Array<{
        id: string;
        name: string;
        symbol: string;
        market_cap_rank: number | null;
        thumb: string;
        large: string;
      }>;
    }>('/search', { query });

    if (!searchResults.coins || searchResults.coins.length === 0) {
      return [];
    }

    // Extraction: Take top 10 results
    const top10Ids = searchResults.coins.slice(0, 10).map((coin) => coin.id);

    // Fetch 2: Get market data (price) for those specific IDs
    const marketData = await fetcher<CoinMarketData[]>('/coins/markets', {
      ids: top10Ids.join(','),
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      sparkline: false,
    });

    // Merge: Combine search results with market data
    const merged: SearchCoin[] = searchResults.coins
      .slice(0, 10)
      .map((coin) => {
        const market = marketData.find((m) => m.id === coin.id);
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          market_cap_rank: coin.market_cap_rank,
          thumb: coin.thumb,
          large: coin.large,
          data: {
            price: market?.current_price ?? 0,
            price_change_percentage_24h:
              market?.price_change_percentage_24h ?? 0,
          },
        };
      });

    return merged;
  } catch (error) {
    console.error('Search coins error:', error);
    return [];
  }
}
