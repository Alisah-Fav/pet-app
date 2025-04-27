import React, { useState } from 'react';
import { apiAddTransaction } from '../services/transaction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


const TransactionForm = ({ onTransactionAdded }) => {
  const [transaction, setTransaction] = useState({
    amount: '',
    type: 'expense',
    description: '',
    category: '',
    date: '',
    currency: 'GHS', // default
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // For routing after successful transaction

  const handleAddTransaction = async () => {
    // Validate form
    if (!transaction.amount || !transaction.description || !transaction.category || !transaction.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format data for API
      const transactionData = {
        ...transaction,
        amount: parseFloat(transaction.amount)
      };
      
      // Call the API
      await apiAddTransaction(transactionData);
      
      // Show success feedback
      toast.success('Transaction added successfully!');
      
      // Reset form
      setTransaction({
        amount: '',
        type: 'expense',
        description: '',
        category: '',
        date: '',
        currency: 'GHS',
      });
      
      // Notify parent component
      if (onTransactionAdded) {
        onTransactionAdded();
      }

      // Route to /dashboard/transactions after successful transaction
navigate('/dashboard/transactions');
      
      
    } catch (error) {
      // Show error feedback
      toast.error(error.response?.data?.message || 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Utilities', 'Entertainment','Housing', 'Health', 'Gift', 'Miscellaneous'];
  const incomeCategories = ['Salary', 'Bonus', 'Interest', 'Gift', 'Investment'];

  const categories = transaction.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          placeholder="0.00"
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Currency */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Currency</label>
        <select
          value={transaction.currency}
          onChange={(e) =>
            setTransaction({ ...transaction, currency: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="GHS">GHS (₵)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="NGN">NGN (₦)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      {/* Type and Description */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={transaction.type === 'expense'}
            onChange={(e) =>
              setTransaction({ ...transaction, type: e.target.value, category: '' })
            }
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={transaction.type === 'income'}
            onChange={(e) =>
              setTransaction({ ...transaction, type: e.target.value, category: '' })
            }
          />
          <label htmlFor="income">Income</label>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={transaction.description}
            onChange={(e) =>
              setTransaction({ ...transaction, description: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={transaction.category}
          onChange={(e) =>
            setTransaction({ ...transaction, category: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={transaction.date}
          onChange={(e) =>
            setTransaction({ ...transaction, date: e.target.value })
          }
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleAddTransaction}
        disabled={isSubmitting}
        className={`w-full py-2 rounded transition ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-teal-400 hover:bg-teal-600 text-white'
        }`}
      >
        {isSubmitting ? 'Adding...' : 'Add Transaction'}
      </button>
    </div>
  );
};

export default TransactionForm;




// import React, { useState } from 'react';
// import { apiAddTransaction } from '../services/transaction';

// const TransactionForm = () => {
//   const [transaction, setTransaction] = useState({
//     amount: '',
//     type: 'expense',
//     description: '',
//     category: '',
//     date: '',
//     currency: 'GHS', // default
//   });

//   const handleAddTransaction =async () => {
//     try {
//       const response = await apiAddTransaction(transaction)

      
//     } catch (error) {
      
//     }
//   }
//   const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];
//   const incomeCategories = ['Salary', 'Bonus', 'Interest', 'Gift', 'Investment'];

//   const categories = transaction.type === 'expense' ? expenseCategories : incomeCategories;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

//       {/* Amount */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Amount</label>
//         <input
//           type="number"
//           placeholder="0.00"
//           value={transaction.amount}
//           onChange={(e) =>
//             setTransaction({ ...transaction, amount: e.target.value })
//           }
//           className="w-full border rounded-md px-3 py-2"
//         />
//       </div>

//       {/* Currency */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Currency</label>
//         <select
//           value={transaction.currency}
//           onChange={(e) =>
//             setTransaction({ ...transaction, currency: e.target.value })
//           }
//           className="w-full border rounded-md px-3 py-2"
//         >
//           <option value="GHS">GHS (₵)</option>
//           <option value="USD">USD ($)</option>
//           <option value="EUR">EUR (€)</option>
//           <option value="NGN">NGN (₦)</option>
//           <option value="GBP">GBP (£)</option>
//         </select>
//       </div>

//       {/* Type and Description */}
//       <div className="mb-4 flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <input
//             type="radio"
//             id="expense"
//             name="type"
//             value="expense"
//             checked={transaction.type === 'expense'}
//             onChange={(e) =>
//               setTransaction({ ...transaction, type: e.target.value, category: '' })
//             }
//           />
//           <label htmlFor="expense">Expense</label>
//           <input
//             type="radio"
//             id="income"
//             name="type"
//             value="income"
//             checked={transaction.type === 'income'}
//             onChange={(e) =>
//               setTransaction({ ...transaction, type: e.target.value, category: '' })
//             }
//           />
//           <label htmlFor="income">Income</label>
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <input
//             type="text"
//             value={transaction.description}
//             onChange={(e) =>
//               setTransaction({ ...transaction, description: e.target.value })
//             }
//             className="w-full border rounded-md px-3 py-2"
//           />
//         </div>
//       </div>

//       {/* Category */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Category</label>
//         <select
//           value={transaction.category}
//           onChange={(e) =>
//             setTransaction({ ...transaction, category: e.target.value })
//           }
//           className="w-full border rounded-md px-3 py-2"
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Date */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Date</label>
//         <input
//           type="date"
//           value={transaction.date}
//           onChange={(e) =>
//             setTransaction({ ...transaction, date: e.target.value })
//           }
//           className="w-full border rounded-md px-3 py-2"
//         />
//       </div>

//       {/* Submit */}
//       <button
//       onClick={handleAddTransaction}
//         type="submit"
//         className="w-full bg-teal-400 text-white py-2 rounded hover:bg-teal-600 transition"
//       >
//         Add Transaction
//       </button>
//     </div>
//   );
// };

// export default TransactionForm;
