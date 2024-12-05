import React, { useState, useEffect } from 'react';
import { Slider } from './components/Slider';
import { Wine, Beer, Percent, DollarSign } from 'lucide-react';
import { LanguageToggle } from './components/LanguageToggle';
import { translations } from './translations';
import { Language } from './types';
import { Layout } from './components/Layout';

function getInitialValues() {
  const params = new URLSearchParams(window.location.search);
  const urlLanguage = params.get('lang')?.toLowerCase();

  return {
    language: (urlLanguage === 'en' || urlLanguage === 'dk' 
      ? urlLanguage 
      : 'en') as Language
  };
}

function App() {
  const initialValues = getInitialValues();
  const [totalSales, setTotalSales] = useState(10000);
  const [avgPrice, setAvgPrice] = useState(20);
  const [premiumPrice, setPremiumPrice] = useState(50);
  const [conversion, setConversion] = useState(25);
  const [newTotalSales, setNewTotalSales] = useState(0);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [language, setLanguage] = useState<Language>(initialValues.language);

  const t = translations[language];

  useEffect(() => {
    const units = totalSales / avgPrice;
    const conversionRate = conversion / 100;
    const newSales =
      units * premiumPrice * conversionRate + (1 - conversionRate) * totalSales;
    setNewTotalSales(newSales);
    setPercentageIncrease(((newSales - totalSales) / totalSales) * 100);
  }, [totalSales, avgPrice, premiumPrice, conversion]);

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', language);
    window.history.replaceState({}, '', newUrl.toString());
  }, [language]);

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(language === 'dk' ? 'da-DK' : 'en-US', {maximumFractionDigits: 2}).format(value);
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl relative z-10">
        <div className="flex flex-col items-center h-28 md:h-64 lg:h-48">
          <img src="botivo.png" className="h-full object-contain" alt="Botivo Logo"/>
        </div>
        
        <div className="bg-[var(--bg2-color)] p-8 rounded-lg shadow-lg w-full backdrop-blur-sm bg-opacity-95">
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{
              color: 'var(--text-color)',
              fontFamily: 'Queenscondensed, sans-serif',
            }}
          >
            {t.title}
          </h1>

          <div className="space-y-6">
            <Slider
              label={t.totalSales}
              value={totalSales}
              onChange={setTotalSales}
              min={0}
              max={100000}
              step={500}
              icon={<DollarSign className="w-6 h-6 text-[var(--text-color)]" />}
              formatValue={formatNumber}
            />

            <Slider
              label={t.avgPrice}
              value={avgPrice}
              onChange={setAvgPrice}
              min={1}
              max={20}
              step={1}
              icon={<Beer className="w-6 h-6 text-[var(--text-color)]" />}
              formatValue={formatNumber}
            />

            <Slider
              label={t.premiumPrice}
              value={premiumPrice}
              onChange={setPremiumPrice}
              min={1}
              max={40}
              step={1}
              icon={<Wine className="w-6 h-6 text-[var(--text-color)]" />}
              formatValue={formatNumber}
            />

            <Slider
              label={t.conversion}
              value={conversion}
              onChange={setConversion}
              min={0}
              max={100}
              step={1}
              icon={<Percent className="w-6 h-6 text-[var(--text-color)]" />}
              formatValue={(value) => `${formatNumber(value)}%`}
            />
          </div>

          <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: "var(--box-color)"}}>
            <h2 className="text-xl font-semibold mb-2 text-[var(--text-color)]">
              {t.results}
            </h2>
            <p className="text-lg text-[var(--text-color)]">
              {t.estimatedSales}:{' '}
              <span className="font-bold text-[var(--text-color)]">
                {formatNumber(newTotalSales)}
              </span>
            </p>
            <p className="text-lg text-[var(--text-color)]">
              {t.percentageIncrease}:{' '}
              <span className="font-bold text-[var(--text-color)]">
                {formatNumber(percentageIncrease)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;