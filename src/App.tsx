import React, { useState, useEffect } from 'react';
import { Slider } from './components/Slider';
import { Wine, Beer, Percent, DollarSign } from 'lucide-react';
import { LanguageToggle } from './components/LanguageToggle';
import { CurrencySelect } from './components/CurrencySelect';
import { translations } from './translations';
import { Currency, currencyConfigs, Language } from './types';

function getInitialValues() {
  const params = new URLSearchParams(window.location.search);
  const urlCurrency = params.get('currency')?.toUpperCase();
  const urlLanguage = params.get('lang')?.toLowerCase();

  return {
    currency: (urlCurrency && Object.keys(currencyConfigs).includes(urlCurrency) 
      ? urlCurrency 
      : 'DKK') as Currency,
    language: (urlLanguage === 'en' || urlLanguage === 'dk' 
      ? urlLanguage 
      : 'dk') as Language
  };
}

function App() {
  const initialValues = getInitialValues();
  const [totalSales, setTotalSales] = useState(10000);
  const [avgPrice, setAvgPrice] = useState(20);
  const [premiumPrice, setPremiumPrice] = useState(50);
  const [conversion, setConversion] = useState(50);
  const [newTotalSales, setNewTotalSales] = useState(0);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [language, setLanguage] = useState<Language>(initialValues.language);
  const [currency, setCurrency] = useState<Currency>(initialValues.currency);

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
    newUrl.searchParams.set('currency', currency);
    newUrl.searchParams.set('lang', language);
    window.history.replaceState({}, '', newUrl.toString());
  }, [currency, language]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(language === 'dk' ? 'da-DK' : 'en-US', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    }).format(value);
  };

  const convertToDisplayValue = (value: number): number => {
    const { rate } = currencyConfigs[currency];
    return value * rate;
  };

  const convertFromDisplayValue = (value: number): number => {
    const { rate } = currencyConfigs[currency];
    return value / rate;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <img src="logo.png" alt="NOLO Collective Logo" className="h-24 mb-4" />
          <div className="w-full flex justify-end items-center">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <CurrencySelect currency={currency} setCurrency={setCurrency} />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: '#009D86' }}
          >
            {t.title}
          </h1>

          <div className="space-y-6">
            <Slider
              label={t.totalSales.replace('DKK', currencyConfigs[currency].symbol)}
              value={totalSales}
              onChange={setTotalSales}
              min={0}
              max={100000}
              step={100}
              icon={<DollarSign className="w-6 h-6 text-[#009D86]" />}
              formatValue={formatCurrency}
              convertToDisplay={convertToDisplayValue}
              convertFromDisplay={convertFromDisplayValue}
            />

            <Slider
              label={t.avgPrice.replace('DKK', currencyConfigs[currency].symbol)}
              value={avgPrice}
              onChange={setAvgPrice}
              min={1}
              max={100}
              step={1}
              icon={<Beer className="w-6 h-6 text-[#009D86]" />}
              formatValue={formatCurrency}
              convertToDisplay={convertToDisplayValue}
              convertFromDisplay={convertFromDisplayValue}
            />

            <Slider
              label={t.premiumPrice.replace('DKK', currencyConfigs[currency].symbol)}
              value={premiumPrice}
              onChange={setPremiumPrice}
              min={1}
              max={200}
              step={1}
              icon={<Wine className="w-6 h-6 text-[#009D86]" />}
              formatValue={formatCurrency}
              convertToDisplay={convertToDisplayValue}
              convertFromDisplay={convertFromDisplayValue}
            />

            <Slider
              label={t.conversion}
              value={conversion}
              onChange={setConversion}
              min={0}
              max={100}
              step={1}
              icon={<Percent className="w-6 h-6 text-[#009D86]" />}
              formatValue={(value) => `${value}%`}
            />
          </div>

          <div className="mt-8 p-4 bg-[#009D86] bg-opacity-10 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-[#009D86]">
              {t.results}
            </h2>
            <p className="text-lg">
              {t.estimatedSales}:{' '}
              <span className="font-bold text-[#009D86]">
                {formatCurrency(convertToDisplayValue(newTotalSales))}
              </span>
            </p>
            <p className="text-lg">
              {t.percentageIncrease}:{' '}
              <span className="font-bold text-[#009D86]">
                {percentageIncrease.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;