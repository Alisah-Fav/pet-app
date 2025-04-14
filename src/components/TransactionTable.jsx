// import React, { useState } from 'react';
// import { Pencil, Trash } from 'lucide-react';

// const dummyTransactions = [
//   { id: 1, date: '2024-04-21', description: 'Groceries', category: 'Groceries', amount: 50 },
//   { id: 2, date: '2024-04-20', description: 'Freelance', category: 'Electricity', amount: 1500 },
// ];

// const TransactionTable = () => {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [openAccordion, setOpenAccordion] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [transactionToDelete, setTransactionToDelete] = useState(null);

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const toggleAccordion = (id) => {
//     setOpenAccordion((prev) => (prev === id ? null : id)); // Toggle between open/closed
//   };

//   const handleDelete = (id) => {
//     setShowModal(false);
//     alert(`Transaction with ID ${id} deleted!`);
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow relative">
//       {/* Table for larger screens */}
//       <div className="hidden md:block">
//         <table className="w-full text-left border-separate border-spacing-y-2">
//           <thead>
//             <tr className="text-gray-500 text-sm">
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.length === dummyTransactions.length}
//                   onChange={() => {}}
//                 />
//               </th>
//               <th>Date</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th className="text-right">Amount</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {dummyTransactions.map((tx) => (
//               <tr key={tx.id} className="group hover:bg-gray-50 transition rounded">
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedIds.includes(tx.id)}
//                     onChange={() => toggleSelect(tx.id)}
//                   />
//                 </td>
//                 <td>{tx.date}</td>
//                 <td>{tx.description}</td>
//                 <td>{tx.category}</td>
//                 <td className="text-red-500 text-right">
//                   ${tx.amount.toLocaleString()}
//                 </td>
//                 <td className="pl-4">
//                   <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
//                     <button title="Edit">
//                       <Pencil className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button
//                       title="Delete"
//                       onClick={() => {
//                         setTransactionToDelete(tx.id);
//                         setShowModal(true);
//                       }}
//                     >
//                       <Trash className="w-4 h-4 text-red-600" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Accordion for smaller screens */}
//       <div className="md:hidden space-y-4">
//         {dummyTransactions.map((tx) => (
//           <div key={tx.id} className="border rounded p-4 bg-white shadow-sm">
//             <div
//               className="flex justify-between cursor-pointer"
//               onClick={() => toggleAccordion(tx.id)}
//             >
//               <div className="font-semibold text-gray-800">{tx.description}</div>
//               <div className="text-red-500">${tx.amount.toLocaleString()}</div>
//             </div>

//             {openAccordion === tx.id && (
//               <div className="mt-2">
//                 <div className="text-sm text-gray-500">
//                   <p><strong>Date:</strong> {tx.date}</p>
//                   <p><strong>Category:</strong> {tx.category}</p>
//                 </div>
//                 <div className="mt-2 flex justify-between gap-3">
//                   <button title="Edit">
//                     <Pencil className="w-4 h-4 text-blue-600" />
//                   </button>
//                   <button
//                     title="Delete"
//                     onClick={() => {
//                       setTransactionToDelete(tx.id);
//                       setShowModal(true);
//                     }}
//                   >
//                     <Trash className="w-4 h-4 text-red-600" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-10 w-full max-w-sm">
//           <p className="mb-4 text-sm text-gray-700">
//             Are you sure you want to delete this transaction?
//           </p>
//           <div className="flex justify-end gap-3">
//             <button
//               className="px-3 py-1 border rounded hover:bg-gray-100"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               onClick={() => handleDelete(transactionToDelete)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionTable;


import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import React from "react";

const TransactionTable = () => {
  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      {/* Table View for medium and Up */}
      <div className="hidden md:block">
        <table className="w-full text-left  border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="group hover:bg-gray-50 transition rounded">
              <td><input type="checkbox" /></td>
              <td>2024-04-21</td>
              <td>Groceries</td>
              <td>Groceries</td>
              <td className="text-red-500">$50</td>
              <td>
                <div className="hidden group-hover:flex gap-3">
                  <button title="Edit" className="text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button title="Delete" className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>


            {/* Row 2 */}
            <tr className="group hover:bg-gray-50 transition rounded">
              <td><input type="checkbox" /></td>
              <td>2024-04-20</td>
              <td>Freelance</td>
              <td>Electricity</td>
              <td className="text-red-500">$1500</td>
              <td className="pl-4">
                <div className="hidden group-hover:flex gap-3">
                  <button title="Edit" className="text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button title="Delete" className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div className="md:hidden space-y-4">

        <div className="relative border rounded p-4 shadow-sm bg-white group">
          {/* Dropdown Trigger */}
          <div className="absolute top-2 right-2">
            <button className="peer">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            <div className="hidden peer-focus:flex flex-col bg-white border shadow rounded-md p-2 gap-2 absolute right-0 mt-2 z-10">
              <button className="flex items-center gap-1 text-blue-600 text-sm">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button className="flex items-center gap-1 text-red-600 text-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex justify-between pr-12">
            <div className="font-semibold text-gray-800">Groceries</div>
            <div className="text-red-500 font-medium">$50</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p><strong>Date:</strong> 2024-04-21</p>
            <p><strong>Category:</strong> Groceries</p>
          </div>
        </div>

      </div>

      <div className="md:hidden space-y-4">

        <div className="relative border rounded p-4 shadow-sm bg-white group">
          {/* Dropdown Trigger */}
          <div className="absolute top-2 right-2">
            <button className="peer">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            <div className="hidden peer-focus:flex flex-col bg-white border shadow rounded-md p-2 gap-2 absolute right-0 mt-2 z-10">
              <button className="flex items-center gap-1 text-blue-600 text-sm">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button className="flex items-center gap-1 text-red-600 text-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex justify-between pr-12">
            <div className="font-semibold text-gray-800">Freelance</div>
            <div className="text-red-500 font-medium">$1500</div>
          </div>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p><strong>Date:</strong> 2024-04-20</p>
            <p><strong>Category:</strong> Electricity</p>
          </div>
        </div>

      </div>


    </div>
  )
}
export default TransactionTable