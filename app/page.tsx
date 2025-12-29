import CoinOverview from '@/components/home/coin-overview';
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from '@/components/home/fallback';
import TrendingCoins from '@/components/home/trending-coins';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className='w-full mt-7 space-y-4'>
        <Suspense
          fallback={
            // <CategoriesFallback />
            <p>Loading categories...</p>
          }>
          {/* <Categories /> */}
          <div>Categories</div>
        </Suspense>
      </section>
    </main>
  );
}
