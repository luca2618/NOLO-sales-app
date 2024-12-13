import { Language } from '../types';

export const formatNumber = (value: number, language: Language): string => {
  return new Intl.NumberFormat(language === 'dk' ? 'da-DK' : 'en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 1
  }).format(value);
};

export const formatCurrency = (value: number, language: Language): string => {
  return `${formatNumber(value, language)}£`;
};

export const formatPercentage = (value: number, language: Language): string => {
  return `${formatNumber(value, language)}%`;
};