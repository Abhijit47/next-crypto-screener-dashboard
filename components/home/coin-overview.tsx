import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

export default async function CoinOverview() {
  const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: 'symbol',
  });

  return (
    <div id='coin-overview'>
      <div className='header p-2'>
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        {/* // src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
          // alt='bitcoin'
          // width={100}
          // height={100} */}
        <div className='info'>
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
}
