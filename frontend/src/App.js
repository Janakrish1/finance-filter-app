import { useState } from "react";

function App() {

  const [financialData, setFinancialData] = useState([
    {
      date: "2024-09-28",
      revenue: 5000000,
      netIncome: 1200000,
      grossProfit: 3000000,
      eps: 2.5,
      operatingIncome: 1000000
    },
    {
      date: "2023-09-28",
      revenue: 4500000,
      netIncome: 1100000,
      grossProfit: 2800000,
      eps: 2.2,
      operatingIncome: 900000
    },
    {
      date: "2022-09-28",
      revenue: 4000000,
      netIncome: 1000000,
      grossProfit: 2500000,
      eps: 2.0,
      operatingIncome: 800000
    }
  ]);

  return (
    <div className="p-8">
      <h1 className="text-7xl text-center text-red-400 mb-8">Financial Data Filtering App</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Revenue</th>
              <th className="border border-gray-300 px-4 py-2">Net Income</th>
              <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-300 px-4 py-2">EPS</th>
              <th className="border border-gray-300 px-4 py-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2">{row.revenue.toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{row.netIncome.toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{row.grossProfit.toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{row.eps}</td>
                <td className="border border-gray-300 px-4 py-2">{row.operatingIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
