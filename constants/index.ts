import {
  CandlestickSeriesPartialOptions,
  ChartOptions,
  ColorType,
  DeepPartial,
} from 'lightweight-charts';

export const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Search',
    href: '/',
  },
  {
    label: 'All Coins',
    href: '/coins',
  },
];

const CHART_COLORS = {
  background: '#0b1116',
  text: '#8f9fb1',
  grid: '#1a2332',
  border: '#1a2332',
  crosshairVertical: '#ffffff40',
  crosshairHorizontal: '#ffffff20',
  candleUp: '#158A6E',
  candleDown: '#EB1C36',
} as const;

export const getCandlestickConfig = (): CandlestickSeriesPartialOptions => ({
  upColor: CHART_COLORS.candleUp,
  downColor: CHART_COLORS.candleDown,
  wickUpColor: CHART_COLORS.candleUp,
  wickDownColor: CHART_COLORS.candleDown,
  borderVisible: true,
  wickVisible: true,
});

export const getChartConfig = (
  height: number,
  timeVisible: boolean = true
): DeepPartial<ChartOptions> => ({
  width: 0,
  height,
  layout: {
    background: { type: ColorType.Solid, color: CHART_COLORS.background },
    textColor: CHART_COLORS.text,
    fontSize: 12,
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial',
  },
  grid: {
    vertLines: { visible: false },
    horzLines: {
      visible: true,
      color: CHART_COLORS.grid,
      style: 2,
    },
  },
  rightPriceScale: {
    borderColor: CHART_COLORS.border,
  },
  timeScale: {
    borderColor: CHART_COLORS.border,
    timeVisible,
    secondsVisible: false,
  },
  handleScroll: true,
  handleScale: true,
  crosshair: {
    mode: 1,
    vertLine: {
      visible: true,
      color: CHART_COLORS.crosshairVertical,
      width: 1,
      style: 0,
    },
    horzLine: {
      visible: true,
      color: CHART_COLORS.crosshairHorizontal,
      width: 1,
      style: 0,
    },
  },
  localization: {
    priceFormatter: (price: number) =>
      '$' + price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
  },
});

export const PERIOD_CONFIG: Record<
  Period,
  { days: number | string; interval?: 'hourly' | 'daily' }
> = {
  daily: { days: 1, interval: 'hourly' },
  weekly: { days: 7, interval: 'hourly' },
  monthly: { days: 30, interval: 'hourly' },
  '3months': { days: 90, interval: 'daily' },
  '6months': { days: 180, interval: 'daily' },
  yearly: { days: 365 },
  max: { days: 'max' },
};

export const PERIOD_BUTTONS: { value: Period; label: string }[] = [
  { value: 'daily', label: '1D' },
  { value: 'weekly', label: '1W' },
  { value: 'monthly', label: '1M' },
  { value: '3months', label: '3M' },
  { value: '6months', label: '6M' },
  { value: 'yearly', label: '1Y' },
  { value: 'max', label: 'Max' },
];

export const LIVE_INTERVAL_BUTTONS: { value: '1s' | '1m'; label: string }[] = [
  { value: '1s', label: '1s' },
  { value: '1m', label: '1m' },
];

// dummy data for trending coins
// Local dummy dataset for Trending coins
export const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: '/assets/logo.svg',
      large: '/assets/logo.svg',
      data: {
        price: 89111,
        price_change_percentage_24h: { usd: 1.85 },
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: '/assets/converter.svg',
      large: '/assets/converter.svg',
      data: {
        price: 3811.23,
        price_change_percentage_24h: { usd: -0.74 },
      },
    },
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      market_cap_rank: 3,
      thumb: '/assets/logo.svg',
      large: '/assets/logo.svg',
      data: {
        price: 165.5,
        price_change_percentage_24h: { usd: 3.12 },
      },
    },
  },
  {
    item: {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      market_cap_rank: 9,
      thumb: '/assets/converter.svg',
      large: '/assets/converter.svg',
      data: {
        price: 1.14,
        price_change_percentage_24h: { usd: 0.27 },
      },
    },
  },
];
