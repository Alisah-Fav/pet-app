import React from 'react'

const SummaryCard = () => {
  const summary = {
    income: 5000,
    expenses: 2100,
  }
  const  balance = summary.income - summary.expenses;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
       {/* Total Income */}
      <div className='bg-white p-4 rounded shadow'>
        <h3 className='text-gray-600'>Total Income</h3>
        <p className='text-green-600 font-bold text-xl'>${summary.income}</p>
      </div>
       {/* Total Expenses */}
       <div className='bg-white p-4 rounded shadow'>
        <h3 className='text-gray-600'>Total Expenses</h3>
        <p className='text-green-600 font-bold text-xl'>${summary.expenses}</p>
       </div>
       {/* Current Balance */}
       <div className='bg-white p-4 rounded shadow'>
        <h3 className='text-gray-600'>Current Balance</h3>
        <p className='text-green-600 font-bold text-xl'>${balance}</p>
       </div>
    </div>
  )
}

export default SummaryCard