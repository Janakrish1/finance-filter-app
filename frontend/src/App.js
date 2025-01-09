import React, { useState, useEffect } from "react";

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/financial-data");
        if (!response.ok) {
          throw new Error("Failed to fetch financial data");
        }
        const data = await response.json();
        setFinancialData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-7xl text-center text-red-400 mb-8">Financial Data Filtering App - v4</h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
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
      )}
    </div>
  );
}

export default App;
