import React, { useState, useEffect } from 'react';
import { Slider } from './components/Slider';
import { Wine, Beer, Percent } from 'lucide-react';
import { LanguageToggle } from './components/LanguageToggle';
import { translations } from './translations';

function App() {
  const [totalSales, setTotalSales] = useState(10000);
  const [avgPrice, setAvgPrice] = useState(20);
  const [premiumPrice, setPremiumPrice] = useState(50);
  const [conversion, setConversion] = useState(50);
  const [newTotalSales, setNewTotalSales] = useState(0);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [language, setLanguage] = useState<'en' | 'dk'>('dk');

  useEffect(() => {
    const units = totalSales / avgPrice;
    const conversionRate = conversion / 100;
    const newSales =
      units * premiumPrice * conversionRate + (1 - conversionRate) * totalSales;
    setNewTotalSales(newSales);
    setPercentageIncrease(((newSales - totalSales) / totalSales) * 100);
  }, [totalSales, avgPrice, premiumPrice, conversion]);

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full">
        <div className="flex justify-between items-center mb-6">
          <img src="logo.png" alt="NOLO Collective Logo" className="h-24" />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: '#009D86' }}
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
            step={1000}
            icon={<Beer className="w-6 h-6 text-[#009D86]" />}
          />

          <Slider
            label={t.avgPrice}
            value={avgPrice}
            onChange={setAvgPrice}
            min={1}
            max={100}
            step={1}
            icon={<Beer className="w-6 h-6 text-[#009D86]" />}
          />

          <Slider
            label={t.premiumPrice}
            value={premiumPrice}
            onChange={setPremiumPrice}
            min={1}
            max={200}
            step={1}
            icon={<Wine className="w-6 h-6 text-[#009D86]" />}
          />

          <Slider
            label={t.conversion}
            value={conversion}
            onChange={setConversion}
            min={0}
            max={100}
            step={1}
            icon={<Percent className="w-6 h-6 text-[#009D86]" />}
          />
        </div>

        <div className="mt-8 p-4 bg-[#009D86] bg-opacity-10 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-[#009D86]">
            {t.results}
          </h2>
          <p className="text-lg">
            {t.estimatedSales}:{' '}
            <span className="font-bold text-[#009D86]">
              {newTotalSales.toLocaleString(
                language === 'dk' ? 'da-DK' : 'en-US',
                { style: 'currency', currency: 'DKK' }
              )}
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
  );
}

export default App;
