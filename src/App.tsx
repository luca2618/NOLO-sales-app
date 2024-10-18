import React, { useState, useEffect } from 'react';
import { Slider } from './components/Slider';
import { Wine, Beer, Percent } from 'lucide-react';

function App() {
  const [totalSales, setTotalSales] = useState(10000);
  const [avgPrice, setAvgPrice] = useState(20);
  const [premiumPrice, setPremiumPrice] = useState(50);
  const [conversion, setConversion] = useState(50);
  const [newTotalSales, setNewTotalSales] = useState(0);
  const [percentageIncrease, setPercentageIncrease] = useState(0);

  useEffect(() => {
    const units = totalSales / avgPrice;
    const conversionRate = conversion / 100;
    const newSales = (units * premiumPrice * conversionRate) + ((1 - conversionRate) * totalSales);
    setNewTotalSales(newSales);
    setPercentageIncrease(((newSales - totalSales) / totalSales) * 100);
  }, [totalSales, avgPrice, premiumPrice, conversion]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#009D86' }}>NOLO Conversion Calculator</h1>
        
        <div className="space-y-6">
          <Slider
            label="Total Sales of Water and Soft Drinks (DKK)"
            value={totalSales}
            onChange={setTotalSales}
            min={0}
            max={100000}
            step={1000}
            icon={<Beer className="w-6 h-6 text-blue-500" />}
          />
          
          <Slider
            label="Average Price of Water and Soft Drinks (DKK)"
            value={avgPrice}
            onChange={setAvgPrice}
            min={1}
            max={100}
            step={1}
            icon={<Beer className="w-6 h-6 text-green-500" />}
          />
          
          <Slider
            label="Price of Average Premium Non-Alcoholic Beverage (DKK)"
            value={premiumPrice}
            onChange={setPremiumPrice}
            min={1}
            max={200}
            step={1}
            icon={<Wine className="w-6 h-6 text-purple-500" />}
          />

          <Slider
            label="Conversion Rate (%)"
            value={conversion}
            onChange={setConversion}
            min={0}
            max={100}
            step={1}
            icon={<Percent className="w-6 h-6 text-yellow-500" />}
          />
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Results</h2>
          <p className="text-lg">
            Estimated New Total Sales2: <span className="font-bold text-green-600">{newTotalSales.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</span>
          </p>
          <p className="text-lg">
            Percentage Increase: <span className="font-bold text-green-600">{percentageIncrease.toFixed(2)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;