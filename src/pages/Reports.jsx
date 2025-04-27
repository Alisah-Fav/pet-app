import React, { useState, useEffect } from "react";
import Piechart from "../components/Piechart";
import Barchart from "../components/BarChart";
import { apiGetAllTransactions } from "../services/transaction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch all transactions
  const fetchTransactions = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await apiGetAllTransactions();
      if (response && response.data) {
        const validTransactions = response.data.filter(transaction => 
          transaction && transaction.id && transaction.amount
        ) || [];
        
        setTransactions(validTransactions);
        
        // Process transactions for chart data
        processChartData(validTransactions);
      } else {
        setTransactions([]);
        setPieData([]);
        setBarData([]);
      }
    } catch (err) {
      console?.error('Error fetching transactions:', err);
      setError('Failed to load transaction data for reports');
      toast.error('Failed to load transaction data');
    } finally {
      setIsLoading(false);
    }
  };

  // Process transactions into chart data
  const processChartData = (transactions) => {
    if (!transactions || transactions.length === 0) {
      setPieData([]);
      setBarData([]);
      return;
    }

    // Find the currency from transactions (assuming all use the same currency)
    // Default to $ if not found
    const currency = transactions[0]?.currency || "$";

    // Prepare Piechart data - expense categories
    const categoryTotals = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
        return acc;
      }, {});

    const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
      currency // Add currency to each data point
    }));
    setPieData(pieChartData);

    // Prepare Barchart data - monthly income/expenses
    const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthly = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const month = monthMap[date.getMonth()];

      if (!monthly[month]) {
        monthly[month] = { month, income: 0, expenses: 0, currency }; // Add currency
      }

      if (t.type === "income") {
        monthly[month].income += parseFloat(t.amount);
      } else {
        monthly[month].expenses += parseFloat(t.amount);
      }
    });

    // Sort months chronologically
    const barChartData = Object.values(monthly).sort((a, b) => {
      return monthMap.indexOf(a.month) - monthMap.indexOf(b.month);
    });
    setBarData(barChartData);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Loading charts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>

      {/* Overview section for Piechart Data */}


      {/* If no data exists for Piechart */}
      {(pieData.length === 0 && barData.length === 0) ? (
        <div className="text-center py-8">
          No transaction data available for reports. Add some transactions to see your financial insights.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {pieData.length > 0 ? (
            <div className="h-80">
              <Piechart data={pieData} />
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow text-center py-8">
              No expense category data available
            </div>
          )}
          
          {barData.length > 0 ? (
            <div className="h-80">
              <Barchart data={barData} />
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow text-center py-8">
              No monthly data available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;











// import React, { useState, useEffect } from "react";
// import Piechart from "../components/Piechart";
// import Barchart from "../components/BarChart";
// import { apiGetAllTransactions } from "../services/transaction";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Reports = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [pieData, setPieData] = useState([]);
//   const [barData, setBarData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch transactions on component mount
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // Fetch all transactions
//   const fetchTransactions = async () => {
//     setError(null);
//     setIsLoading(true);
    
//     try {
//       const response = await apiGetAllTransactions();
//       if (response && response.data) {
//         const validTransactions = response.data.filter(transaction => 
//           transaction && transaction.id && transaction.amount
//         ) || [];
        
//         setTransactions(validTransactions);
        
//         // Process transactions for chart data
//         processChartData(validTransactions);
//       } else {
//         setTransactions([]);
//         setPieData([]);
//         setBarData([]);
//       }
//     } catch (err) {
//       console.error('Error fetching transactions:', err);
//       setError('Failed to load transaction data for reports');
//       toast.error('Failed to load transaction data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Process transactions into chart data
//   const processChartData = (transactions) => {
//     if (!transactions || transactions.length === 0) {
//       setPieData([]);
//       setBarData([]);
//       return;
//     }

//     // Prepare Piechart data - expense categories
//     const categoryTotals = transactions
//       .filter((t) => t.type === "expense")
//       .reduce((acc, curr) => {
//         acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
//         return acc;
//       }, {});

//     const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({
//       name,
//       value,
//     }));
//     setPieData(pieChartData);

//     // Prepare Barchart data - monthly income/expenses
//     const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const monthly = {};

//     transactions.forEach((t) => {
//       const date = new Date(t.date);
//       const month = monthMap[date.getMonth()];

//       if (!monthly[month]) {
//         monthly[month] = { month, income: 0, expenses: 0 };
//       }

//       if (t.type === "income") {
//         monthly[month].income += parseFloat(t.amount);
//       } else {
//         monthly[month].expenses += parseFloat(t.amount);
//       }
//     });

//     // Sort months chronologically
//     const barChartData = Object.values(monthly).sort((a, b) => {
//       return monthMap.indexOf(a.month) - monthMap.indexOf(b.month);
//     });
//     setBarData(barChartData);
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="text-lg">Loading charts...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="text-lg text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>
      
//       {(pieData.length === 0 && barData.length === 0) ? (
//         <div className="text-center py-8">
//           No transaction data available for reports. Add some transactions to see your financial insights.
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {pieData.length > 0 ? (
//             <div className="h-80">
//               <Piechart data={pieData} />
//             </div>
//           ) : (
//             <div className="bg-white p-4 rounded-xl shadow text-center py-8">
//               No expense category data available
//             </div>
//           )}
          
//           {barData.length > 0 ? (
//             <div className="h-80">
//               <Barchart data={barData} />
//             </div>
//           ) : (
//             <div className="bg-white p-4 rounded-xl shadow text-center py-8">
//               No monthly data available
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reports;










// import React, { useState, useEffect } from "react";
// import Piechart from "../components/Piechart";
// import Barchart from "../components/BarChart";
// import { apiPie, apiBar } from "../services/transaction";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Reports = () => {
//   const [pieData, setPieData] = useState([]);
//   const [barData, setBarData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         // Fetch pie chart data for expense categories
//         const pieResponse = await apiPie();
//         if (pieResponse && pieResponse.data) {
//           setPieData(pieResponse.data);
//         }
        
//         // Fetch bar chart data for monthly income/expenses
//         const barResponse = await apiBar();
//         if (barResponse && barResponse.data) {
//           setBarData(barResponse.data);
//         }
//       } catch (err) {
//         console.error("Error fetching chart data:", err);
//         setError("Failed to load chart data. Please try again.");
//         toast.error("Failed to load chart data");
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchChartData();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="text-lg">Loading charts...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="text-lg text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>
      
//       {(pieData.length === 0 && barData.length === 0) ? (
//         <div className="text-center py-8">
//           No transaction data available for reports. Add some transactions to see your financial insights.
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {pieData.length > 0 ? (
//             <Piechart data={pieData} />
//           ) : (
//             <div className="bg-white p-4 rounded-xl shadow text-center py-8">
//               No expense category data available
//             </div>
//           )}
          
//           {barData.length > 0 ? (
//             <Barchart data={barData} />
//           ) : (
//             <div className="bg-white p-4 rounded-xl shadow text-center py-8">
//               No monthly data available
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reports;









// // import React from "react";
// // import Piechart from "../components/Piechart";
// // import Barchart from "../components/BarChart";


// // const transactions = [
// //   { id: 1, type: "expense", amount: 1500, category: "Electricity", date: "2024-04-20" },
// //   { id: 2, type: "expense", amount: 100, category: "Internet", date: "2024-05-15" },
// //   { id: 3, type: "expense", amount: 1200, category: "Rent", date: "2024-06-10" },
// //   { id: 4, type: "income", amount: 3000, category: "Income", date: "2024-06-20" },
// //   { id: 5, type: "income", amount: 250, category: "Dividends", date: "2024-07-01" },
// //   { id: 6, type: "expense", amount: 200, category: "Groceries", date: "2024-07-05" },
// //   { id: 7, type: "income", amount: 500, category: "Cash Gift", date: "2024-07-15" },
// //   { id: 8, type: "expense", amount: 180, category: "Office Supplies", date: "2024-07-22" }
// // ];


// // // Prepare Piechart data
// // const categoryTotals = transactions
// //   .filter((t) => t.type === "expense")
// //   .reduce((acc, curr) => {
// //     acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
// //     return acc;
// //   }, {});

// // const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
// //   name,
// //   value,
// // }));

// // // Prepare Barchart data
// // const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// // const monthly = {};

// // transactions.forEach((t) => {
// //   const date = new Date(t.date);
// //   const month = monthMap[date.getMonth()];

// //   if (!monthly[month]) {
// //     monthly[month] = { month, income: 0, expenses: 0 };
// //   }

// //   if (t.type === "income") {
// //     monthly[month].income += t.amount;
// //   } else {
// //     monthly[month].expenses += t.amount;
// //   }
// // });

// // const barData = Object.values(monthly);

// // const Reports = () => {
// //   return (
// //     <div className="p-6 grid md:grid-cols-2 gap-6">
// //       <Piechart data={pieData} />
// //       <Barchart data={barData} />
// //     </div>
// //   );
// // };

// // export default Reports;
