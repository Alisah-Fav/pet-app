import React, { useState } from "react";
import { MoreVertical, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";

const TransactionTable = ({ data, onEdit, onDelete, readOnly = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const filteredData = data.filter((item) =>
    `${item.description} ${item.category} ${item.date}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editItem.amount <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }
    onEdit(editItem);
    toast.success("Transaction updated successfully!");
    setEditItem(null);
  };

  const handleDelete = () => {
    onDelete(deleteItemId);
    toast.success("Transaction deleted successfully!");
    setDeleteItemId(null);
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-6">
      {!readOnly && (
        <div className="flex items-center gap-2 border rounded px-3 py-2 w-full md:w-1/3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none text-sm"
          />
        </div>
      )}

      {/* Table View */}
      <div className="hidden md:block">
        <table className="w-full text-left border-t border-gray-200">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-200">
              {!readOnly && <th className="py-2"><input type="checkbox" /></th>}
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Category</th>
              <th className="py-2">Amount</th>
              {!readOnly && <th className="py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="group hover:bg-gray-50 transition border-b border-gray-100">
                {!readOnly && <td className="py-2"><input type="checkbox" /></td>}
                <td className="py-2">{item.date}</td>
                <td className="py-2">{item.description}</td>
                <td className="py-2">{item.category}</td>
                <td className="py-2 text-red-500">${item.amount}</td>
                {!readOnly && (
                  <td className="py-2">
                    <div className="hidden group-hover:flex gap-3">
                      <button title="Edit" onClick={() => setEditItem(item)} className="text-teal-400">
                        <Pencil size={18} />
                      </button>
                      <button title="Delete" onClick={() => setDeleteItemId(item.id)} className="text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredData.map((item, index) => (
          <div key={index} className="relative border rounded p-4 shadow-sm bg-white group">
            {!readOnly && (
              <div className="absolute top-2 right-2">
                <button className="peer">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                <div className="hidden peer-focus:flex flex-col bg-white border shadow rounded-md p-2 gap-2 absolute right-0 mt-2 z-10">
                  <button className="flex items-center gap-1 text-teal-400 text-sm" onClick={() => setEditItem(item)}>
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-red-600 text-sm" onClick={() => setDeleteItemId(item.id)}>
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-between pr-12">
              <div className="font-semibold text-gray-800">{item.description}</div>
              <div className="text-red-500 font-medium">${item.amount}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500 space-y-1">
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Category:</strong> {item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {!readOnly && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block">Date</label>
                <input
                  type="date"
                  value={editItem.date}
                  onChange={(e) => setEditItem({ ...editItem, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block">Description</label>
                <input
                  type="text"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block">Category</label>
                <input
                  type="text"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label className="block">Amount</label>
                <input
                  type="number"
                  value={editItem.amount}
                  onChange={(e) => setEditItem({ ...editItem, amount: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded"
                  min="any"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditItem(null)} className="text-sm px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="text-sm px-4 py-2 bg-teal-400 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {!readOnly && deleteItemId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this transaction?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleteItemId(null)}
                className="text-sm px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-sm px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
