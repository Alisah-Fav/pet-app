import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import Piechart from '../components/Piechart';
import { apiDashboard } from '../services/transaction';

// Utility: Format number to currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Utility: Format date to human-readable format
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setIsLoading(true);
    try {
      const response = await apiDashboard();
      console.log("Dashboard Data:", response.data);
      if (response.data) {
        setData(response.data);
      }
      console.log("Piechart Raw Data:", data?.spendingByCategory);

    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center p-6">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <SummaryCard summary={data?.summary} />

          {/* Spending by Category Piechart */}
          <Piechart data={data?.spendingByCategory || []} />

          {/* Recent Transactions */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            {data?.recentTransactions?.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recentTransactions.map((item, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="py-2">{formatDate(item.date)}</td>
                      <td className="py-2">{item.description}</td>
                      <td className="py-2">{item.category}</td>
                      <td
                        className={`py-2 ${item.type === 'income' ? 'text-green-600' : 'text-red-500'
                          }`}
                      >
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-sm">No recent transactions available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
