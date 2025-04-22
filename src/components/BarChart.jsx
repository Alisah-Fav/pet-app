import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Barchart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Income vs. Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Bar dataKey="income" fill="#48c9b0" name="Income" />
          <Bar dataKey="expenses" fill="#004D40" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;