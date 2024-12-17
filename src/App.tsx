import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { Language } from './types';
import { Layout } from './components/Layout';
import { Calculator } from './components/Calculator';
import { ResultsPanel } from './components/ResultsPanel';

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

          <Calculator
            totalSales={totalSales}
            avgPrice={avgPrice}
            premiumPrice={premiumPrice}
            conversion={conversion}
            onTotalSalesChange={setTotalSales}
            onAvgPriceChange={setAvgPrice}
            onPremiumPriceChange={setPremiumPrice}
            onConversionChange={setConversion}
            language={language}
          />

          <ResultsPanel
            newTotalSales={newTotalSales}
            totalSales={totalSales}
            percentageIncrease={percentageIncrease}
            language={language}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;