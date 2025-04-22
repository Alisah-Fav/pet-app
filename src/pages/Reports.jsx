import React from "react";
import Piechart from "../components/Piechart";
import Barchart from "../components/BarChart";


const transactions = [
  { id: 1, type: "expense", amount: 1500, category: "Electricity", date: "2024-04-20" },
  { id: 2, type: "expense", amount: 100, category: "Internet", date: "2024-05-15" },
  { id: 3, type: "expense", amount: 1200, category: "Rent", date: "2024-06-10" },
  { id: 4, type: "income", amount: 3000, category: "Income", date: "2024-06-20" },
  { id: 5, type: "income", amount: 250, category: "Dividends", date: "2024-07-01" },
  { id: 6, type: "expense", amount: 200, category: "Groceries", date: "2024-07-05" },
  { id: 7, type: "income", amount: 500, category: "Cash Gift", date: "2024-07-15" },
  { id: 8, type: "expense", amount: 180, category: "Office Supplies", date: "2024-07-22" }
];


// Prepare Piechart data
const categoryTotals = transactions
  .filter((t) => t.type === "expense")
  .reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
  name,
  value,
}));

// Prepare Barchart data
const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const monthly = {};

transactions.forEach((t) => {
  const date = new Date(t.date);
  const month = monthMap[date.getMonth()];

  if (!monthly[month]) {
    monthly[month] = { month, income: 0, expenses: 0 };
  }

  if (t.type === "income") {
    monthly[month].income += t.amount;
  } else {
    monthly[month].expenses += t.amount;
  }
});

const barData = Object.values(monthly);

const Reports = () => {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <Piechart data={pieData} />
      <Barchart data={barData} />
    </div>
  );
};

export default Reports;
