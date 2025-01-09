import React, { useState, useEffect } from "react";

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchData = async () => {
      const timeout = 5000; 
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      );

      try {
        const fetchPromise = fetch("http://127.0.0.1:5000/api/financial-data", { signal });
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
          throw new Error("Failed to fetch financial data");
        }

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
    if (sortConfig.key !== key) return <span className="text-gray-400 ml-2">↑↓</span>;
    return (
      <span className="ml-2">
        {sortConfig.direction === "asc" ? (
          <span className="text-blue-500">↑</span>
        ) : (
          <span className="text-blue-500">↓</span>
        )}
      </span>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-7xl text-center text-red-400 mb-8">Annual Income Statements for Apple Inc.</h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
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
