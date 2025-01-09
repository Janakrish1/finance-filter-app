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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [originalData, setOriginalData] = useState([]);

  const BASE_URL = "https://finance-filter-app.onrender.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/financial-data`);
        if (!response.ok) throw new Error("Failed to fetch financial data");
        const data = await response.json();
        setFinancialData(data);
        setOriginalData(data);
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

      const response = await fetch(`${BASE_URL}/api/filter-financial-data?${query}`);
      if (!response.ok) throw new Error("Failed to fetch filtered financial data");
      const data = await response.json();
      setFinancialData(data);
      setOriginalData(data);
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
      const response = await fetch(`${BASE_URL}/api/financial-data`);
      if (!response.ok) throw new Error("Failed to fetch financial data");
      const data = await response.json();
      setFinancialData(data);
      setOriginalData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortData = (key) => {
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      setSortConfig({ key: null, direction: null });
      setFinancialData(originalData);
      return;
    }
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...financialData].sort((a, b) => {
      if (key === "date") {
        return direction === "asc" ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
      }
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    });
    setSortConfig({ key, direction });
    setFinancialData(sortedData);
  };


  const renderSortIcons = (key) => {
    if (sortConfig.key !== key) return <span className="text-black ml-2">↑↓</span>;
    return (
      <span className="ml-2">
        {sortConfig.direction === "asc" ? (
          <span className="text-white">↑</span>
        ) : (
          <span className="text-white">↓</span>
        )}
      </span>
    );
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <img
          src="./companyLogo.png" 
          alt="Company Logo"
          className="h-16 w-auto"
        />
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Apple Inc. Annual Income Statements
      </h1>

      <div className="mb-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="From Year"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="To Year"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Revenue Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Revenue"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={minRevenue}
                onChange={(e) => setMinRevenue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Revenue"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={maxRevenue}
                onChange={(e) => setMaxRevenue(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Net Income Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Net Income"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={minNetIncome}
                onChange={(e) => setMinNetIncome(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Net Income"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                value={maxNetIncome}
                onChange={(e) => setMaxNetIncome(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <h2 class="text-1xl font-bold text-gray-800 text-left">
          Sort the below data by clicking on Date, Revenue or Net Income</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-blue-200 hover:text-blue-700"
                  onClick={() => sortData("date")}
                >
                  Date {renderSortIcons("date")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-blue-200 hover:text-blue-700"
                  onClick={() => sortData("revenue")}
                >
                  Revenue {renderSortIcons("revenue")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-blue-200 hover:text-blue-700"
                  onClick={() => sortData("netIncome")}
                >
                  Net Income {renderSortIcons("netIncome")}
                </th>
                <th className="py-3 px-6 text-left">Gross Profit</th>
                <th className="py-3 px-6 text-left">EPS</th>
                <th className="py-3 px-6 text-left">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{row.date}</td>
                  <td className="py-3 px-6">{row.revenue.toLocaleString()}</td>
                  <td className="py-3 px-6">{row.netIncome.toLocaleString()}</td>
                  <td className="py-3 px-6">{row.grossProfit.toLocaleString()}</td>
                  <td className="py-3 px-6">{row.eps}</td>
                  <td className="py-3 px-6">{row.operatingIncome.toLocaleString()}</td>
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
