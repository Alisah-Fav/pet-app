import React, { useState, useEffect } from 'react';
import TransactionTable from '../components/TransactionTable';
import TransactionForm from '../components/TransactionForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  apiGetAllTransactions, 
  apiUpdateTransaction, 
  apiDeleteTransaction,
  apiGetFilterTransaction
} from '../services/transaction';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  
  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  // Fetch all transactions
  const fetchTransactions = async () => {
    setError(null);
    setIsLoading(true);
    setActiveFilter("");
    
    try {
      const response = await apiGetAllTransactions();
      // Make sure we only set actual transaction data, not any default data ensure your data exist before you ensure it to your state
      if (response && response.data) {
        setTransactions(response.data.filter(transaction => 
          // Add any validation you need to filter out unwanted transactions
          transaction && transaction.id && transaction.amount
        ) || []);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please try again.');
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle filter with backend API
  const handleFilter = async (filters) => {
    if (!filters.search && !filters.category && !filters.type) {
      // If filters are cleared, revert to all transactions
      fetchTransactions();
      return;
    }
    
    setIsLoading(true);
    setIsFiltering(true);
    setError(null);
    
    // Update active filter display text
    if (filters.search) {
      setActiveFilter(filters.search);
    }
    
    try {
      // This now correctly passes the filters object to apiGetFilterTransaction
      // which will stringify it and add it to the URL
      const response = await apiGetFilterTransaction(filters);
      
      if (response && response.data) {
        setTransactions(response.data.filter(transaction => 
          transaction && transaction.id && transaction.amount
        ) || []);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('Error filtering transactions:', err);
      setError('Failed to filter transactions. Please try again.');
      toast.error('Failed to filter transactions');
    } finally {
      setIsLoading(false);
      setIsFiltering(false);
    }
  };
  
  // Handle transaction creation (from child component)
  const handleTransactionAdded = () => {
    // Refresh the transactions list
    fetchTransactions();
    setShowAddForm(false);
  };
  
  // Handle edit
  const handleEdit = async (updatedItem) => {
    try {
      await apiUpdateTransaction(updatedItem.id, updatedItem);
      // Update local state
      setTransactions(prev =>
        prev.map(item =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
      );
      // Toast is handled in the TransactionTable component
    } catch (err) {
      console.error('Error updating transaction:', err);
      toast.error('Failed to update transaction');
    }
  };
  
  // Handle delete
  const handleDelete = async (id) => {
    try {
      await apiDeleteTransaction(id);
      // Update local state
      setTransactions(prev => prev.filter(item => item.id !== id));
      // Toast is handled in the TransactionTable component
    } catch (err) {
      console.error('Error deleting transaction:', err);
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <div className='p-4'>
      <ToastContainer />
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-teal-400 hover:bg-teal-600 text-white px-4 py-2 rounded transition"
        >
          {showAddForm ? 'Hide Form' : 'Add Transaction'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-8">
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </div>
      )}
      
      {error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : transactions.length === 0 && activeFilter ? (
        <div className="text-center py-8">No transactions found matching "{activeFilter}"</div>
      ) : transactions.length === 0 && !isLoading ? (
        <div className="text-center py-8">No transactions found. Add one to get started!</div>
      ) : (
        <TransactionTable
          data={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onFilter={handleFilter}
          isFiltering={isFiltering}
        />
      )}
    </div>
  );
};

export default Transactions;

