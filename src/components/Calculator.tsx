import React from 'react';
import { Slider } from './Slider';
import { Wine, Beer, Percent, PoundSterling } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface CalculatorProps {
  totalSales: number;
  avgPrice: number;
  premiumPrice: number;
  conversion: number;
  onTotalSalesChange: (value: number) => void;
  onAvgPriceChange: (value: number) => void;
  onPremiumPriceChange: (value: number) => void;
  onConversionChange: (value: number) => void;
  language: Language;
}

export const Calculator: React.FC<CalculatorProps> = ({
  totalSales,
  avgPrice,
  premiumPrice,
  conversion,
  onTotalSalesChange,
  onAvgPriceChange,
  onPremiumPriceChange,
  onConversionChange,
  language,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <Slider
        label={t.totalSales}
        value={totalSales}
        onChange={onTotalSalesChange}
        min={0}
        max={50000}
        step={500}
        icon={<PoundSterling className="w-6 h-6 text-[var(--text-color)]" />}
        formatValue={(value) => formatCurrency(value, language, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      />

      <Slider
        label={t.avgPrice}
        value={avgPrice}
        onChange={onAvgPriceChange}
        min={1}
        max={15}
        step={0.5}
        icon={<Beer className="w-6 h-6 text-[var(--text-color)]" />}
        formatValue={(value) => formatCurrency(value, language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      />

      <Slider
        label={t.premiumPrice}
        value={premiumPrice}
        onChange={onPremiumPriceChange}
        min={1}
        max={30}
        step={0.5}
        icon={<Wine className="w-6 h-6 text-[var(--text-color)]" />}
        formatValue={(value) => formatCurrency(value, language,  { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      />

      <Slider
        label={t.conversion}
        value={conversion}
        onChange={onConversionChange}
        min={0}
        max={100}
        step={1}
        icon={<Percent className="w-6 h-6 text-[var(--text-color)]" />}
        formatValue={(value) => formatPercentage(value, language, { minimumFractionDigits: 0, maximumFractionDigits: 0})}
      />
    </div>
  );
};