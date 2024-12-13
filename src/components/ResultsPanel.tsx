import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface ResultsPanelProps {
  newTotalSales: number;
  totalSales: number;
  percentageIncrease: number;
  language: Language;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  newTotalSales,
  totalSales,
  percentageIncrease,
  language,
}) => {
  const t = translations[language];

  return (
    <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: "var(--box-color)"}}>
      <h2 className="text-xl font-semibold mb-2 text-[var(--text-color)]">
        {t.results}
      </h2>
      <p className="text-lg text-[var(--text-color)]">
        {t.estimatedSales}:{' '}
        <span className="font-bold text-[var(--text-color)]">
          {formatCurrency(newTotalSales, language)}
        </span>
      </p>
      <p className="text-lg text-[var(--text-color)]">
        {t.percentageIncrease}:{' '}
        <span className="font-bold text-[var(--text-color)]">
          {formatPercentage(percentageIncrease, language)}
        </span>
      </p>
      <p className="text-lg text-[var(--text-color)]">
        {t.totalIncrease}:{' '}
        <span className="font-bold text-[var(--text-color)]">
          {formatCurrency(newTotalSales - totalSales, language)}
        </span>
      </p>
    </div>
  );
};