import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import { toast, ToastContainer } from 'react-toastify';  // Import ToastContainer and toast

const initialTransactions = [
  {
    id: 1,
    date: "2024-04-20",
    description: "Freelance",
    category: "Electricity",
    amount: 1500,
    type: "expense",
    currency: "$"
  },
  {
    id: 2,
    date: "2024-05-15",
    description: "Consulting",
    category: "Internet",
    amount: 100,
    type: "expense",
    currency: "$"
  },
  {
    id: 3,
    date: "2024-06-10",
    description: "Freelance",
    category: "Rent",
    amount: 1200,
    type: "expense",
    currency: "$"
  },
  {
    id: 4,
    date: "2024-06-20",
    description: "Salary",
    category: "Income",
    amount: 3000,
    type: "income",
    currency: "$"
  },
  {
    id: 5,
    date: "2024-07-01",
    description: "Investment",
    category: "Dividends",
    amount: 250,
    type: "income",
    currency: "$"
  },
  {
    id: 6,
    date: "2024-07-05",
    description: "Freelance",
    category: "Groceries",
    amount: 200,
    type: "expense",
    currency: "$"
  },
  {
    id: 7,
    date: "2024-07-15",
    description: "Gift",
    category: "Cash Gift",
    amount: 500,
    type: "income",
    currency: "$"
  },
  {
    id: 8,
    date: "2024-07-22",
    description: "Business",
    category: "Office Supplies",
    amount: 180,
    type: "expense",
    currency: "$"
  }
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);

  // Handle edit
  const handleEdit = (updatedItem) => {
    setTransactions(prev =>
      prev.map(item =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
    // toast.success("Transaction updated successfully!"); // Toast after edit
  };

  // Handle delete
  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(item => item.id !== id));
    // toast.success("Transaction deleted successfully!"); // Toast after delete
  };

  return (
    <div className='p-4'>
      {/* Toast Container to show toasts */}
      <ToastContainer />
      
      <TransactionTable
        data={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions;
