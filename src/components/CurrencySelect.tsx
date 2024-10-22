import React from 'react';
import { Currency } from '../types';

interface CurrencySelectProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ currency, setCurrency }) => {
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="ml-2 px-3 py-1 rounded-lg bg-white border border-[#009D86] text-[#009D86] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009D86]"
    >
      <option value="DKK">DKK</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  );
};