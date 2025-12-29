import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import CandleStickChart from '../candle-stick-chart';

export default async function CoinOverview() {
  // try {
  //   const [coin, coinOHLCData] = await Promise.all([
  //     fetcher<CoinDetailsData>('/coins/bitcoin', {
  //       dex_pair_format: 'symbol',
  //     }),
  //     fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
  //       vs_currency: 'inr',
  //       days: 1,
  //       interval: 'hourly',
  //       precision: 'full',
  //     }),
  //   ]);

  //   return (
  //     <div id='coin-overview'>
  //       <CandleStickChart data={coinOHLCData} coinId='bitcoin'>
  //         <div className='header pt-2'>
  //           <Image
  //             src={coin.image.large}
  //             alt={coin.name}
  //             width={56}
  //             height={56}
  //           />
  //           <div className='info'>
  //             <p>
  //               {coin.name} / {coin.symbol.toUpperCase()}
  //             </p>
  //             <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
  //           </div>
  //         </div>
  //       </CandleStickChart>
  //     </div>
  //   );
  // } catch (error) {
  //   console.error('Error fetching coin overview:', error);
  //   return <CoinOverviewFallback />;
  // }

  const [coin, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    }),
    fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
      vs_currency: 'inr',
      days: 1,
      interval: 'hourly',
      precision: 'full',
    }),
  ]);

  return (
    <div id='coin-overview'>
      <CandleStickChart data={coinOHLCData} coinId='bitcoin' liveInterval='1s'>
        <div className='header p-2'>
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
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
      </CandleStickChart>
    </div>
  );
}
