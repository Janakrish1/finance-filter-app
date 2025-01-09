import React, { useState, useEffect } from "react";

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/financial-data");
        if (!response.ok) throw new Error("Failed to fetch financial data");
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

  const applyFilters = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        fromYear,
        toYear,
        minRevenue,
        maxRevenue,
        minNetIncome,
        maxNetIncome,
      }).toString();

      const response = await fetch(`http://127.0.0.1:5000/api/filter-financial-data?${query}`);
      if (!response.ok) throw new Error("Failed to fetch filtered financial data");
      const data = await response.json();
      setFinancialData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = async () => {
    setFromYear("");
    setToYear("");
    setMinRevenue("");
    setMaxRevenue("");
    setMinNetIncome("");
    setMaxNetIncome("");

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/financial-data");
      if (!response.ok) throw new Error("Failed to fetch financial data");
      const data = await response.json();
      setFinancialData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl text-center text-red-400 mb-8">Annual Income Statements for Apple Inc.</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Date Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="From Year"
                className="border px-2 py-1"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="To Year"
                className="border px-2 py-1"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Revenue Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Revenue"
                className="border px-2 py-1"
                value={minRevenue}
                onChange={(e) => setMinRevenue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Revenue"
                className="border px-2 py-1"
                value={maxRevenue}
                onChange={(e) => setMaxRevenue(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Net Income Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Net Income"
                className="border px-2 py-1"
                value={minNetIncome}
                onChange={(e) => setMinNetIncome(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Net Income"
                className="border px-2 py-1"
                value={maxNetIncome}
                onChange={(e) => setMaxNetIncome(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 space-x-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Revenue</th>
                <th className="border px-4 py-2">Net Income</th>
                <th className="border px-4 py-2">Gross Profit</th>
                <th className="border px-4 py-2">EPS</th>
                <th className="border px-4 py-2">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.revenue.toLocaleString()}</td>
                  <td className="border px-4 py-2">{row.netIncome.toLocaleString()}</td>
                  <td className="border px-4 py-2">{row.grossProfit.toLocaleString()}</td>
                  <td className="border px-4 py-2">{row.eps}</td>
                  <td className="border px-4 py-2">{row.operatingIncome.toLocaleString()}</td>
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
