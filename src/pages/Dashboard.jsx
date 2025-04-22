import React from 'react';
import SummaryCard from '../components/SummaryCard';
import Piechart from '../components/Piechart'; // import Piechart component

// Utility: Format number to currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const Dashboard = ({ transactions = [] }) => {
  // Sort and get the 3 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Sample data for Piechart (can be derived from transactions)
  const categoryData = [
    { name: "Food", value: 200 },
    { name: "Rent", value: 500 },
    { name: "Transportation", value: 100 },
    { name: "Utilities", value: 150 },
    { name: "Entertainment", value: 50 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <SummaryCard transactions={transactions} />

      
      {/* Spending by Category Piechart */}
      {/* <div className="bg-white rounded-xl shadow p-4"> */}
        {/* <h2 className="text-lg font-semibold mb-4">Spending by Category</h2> */}
        <Piechart data={categoryData} />
      {/* </div> */}

      {/* Recent Transactions */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {recentTransactions.length > 0 ? (
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
              {recentTransactions.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-2">{item.date}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2">{item.category}</td>
                  <td
                    className={`py-2 ${
                      item.type === 'income' ? 'text-green-600' : 'text-red-500'
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
  );
};

export default Dashboard;
