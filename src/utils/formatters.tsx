import { Language } from '../types';

export const formatNumber = (
  value: number, 
  language: Language, 
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string => {
  const { minimumFractionDigits = 1, maximumFractionDigits = 2 } = options || {};
  return new Intl.NumberFormat(language === 'dk' ? 'da-DK' : 'en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
};

export const formatCurrency = (
  value: number, 
  language: Language, 
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string => {
  return `${formatNumber(value, language, options)} £`;
};

export const formatPercentage = (
  value: number, 
  language: Language, 
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string => {
  return `${formatNumber(value, language, options)}%`;
};
