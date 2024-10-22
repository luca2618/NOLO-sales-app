export type Language = 'en' | 'dk';
export type Currency = 'DKK' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  symbol: string;
  rate: number;
}

export const currencyConfigs: Record<Currency, CurrencyConfig> = {
  DKK: { symbol: 'DKK', rate: 1 },
  USD: { symbol: '$', rate: 0.14 },
  EUR: { symbol: '€', rate: 0.13 },
  GBP: { symbol: '£', rate: 0.11 }
};