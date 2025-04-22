import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#004D40", "#00695C", "#009688", "#26A69A", "#4DB6AC", "#80CBC4"];

const Piechart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false} // Remove the label lines
            label={false} // Remove the labels from segments
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Custom legend below the chart */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((category, index) => (
          <div key={category.name} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-600">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piechart;