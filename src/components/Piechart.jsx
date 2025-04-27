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
  // Find the currency from the first transaction (assuming all transactions use same currency)
  // Default to $ if currency not found
  const currency = data && data.length > 0 && data[0].currency ? data[0].currency : "$";

  // Calculate the total value for percentage calculations
  const totalValue = data?.reduce((sum, category) => sum + category?.value, 0);

  // Custom tooltip to show both percentage and actual value
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
          <p className="font-medium">{item.name}</p>
          <p className="text-gray-600">{percentage}%</p>
          <p className="text-gray-600">{currency}{item.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

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
  labelLine={false}
  label={false}
  animationBegin={0}
  animationDuration={1000}
  animationEasing="ease-out"
>
  {data?.map((entry) => (
    <Cell
      key={entry.name} // ✅ Use category name as key instead of index
      fill={COLORS[data.indexOf(entry) % COLORS.length]}
    />
  ))}
</Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Custom legend below the chart with percentages */}
      <div className="mt-4 grid grid-cols-2 gap-2">
  {data?.map((category) => {
    const percentage = ((category.value / totalValue) * 100).toFixed(1); 
    return (
      <div key={category.name} className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: COLORS[data.indexOf(category) % COLORS.length] }}
        ></div>
        <span className="text-sm text-gray-600">{category.name}</span>
        <span className="text-sm ml-2 text-gray-500">({percentage}%)</span>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default Piechart;











// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#004D40", "#00695C", "#009688", "#26A69A", "#4DB6AC", "#80CBC4"];

// const Piechart = ({ data }) => {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow">
//       <h2 className="font-semibold mb-4">Spending by Category</h2>
//       <ResponsiveContainer width="100%" height={250}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             labelLine={false} // Remove the label lines
//             label={false} // Remove the labels from segments
//           >
//             {data?.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `$${value}`} />
//         </PieChart>
//       </ResponsiveContainer>
      
//       {/* Custom legend below the chart */}
//       <div className="mt-4 grid grid-cols-2 gap-2">
//         {data?.map((category, index) => (
//           <div key={category?.name} className="flex items-center">
//             <div 
//               className="w-3 h-3 rounded-full mr-2" 
//               style={{ backgroundColor: COLORS[index % COLORS.length] }}
//             ></div>
//             <span className="text-sm text-gray-600">{category.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Piechart;