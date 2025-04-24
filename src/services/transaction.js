import { apiClient } from "./config";

export const apiAddTransaction = async (payload) => apiClient.post("/add-transaction", payload);

export const apiGetAllTransactions = async () => apiClient.get("/transactions");


  export const apiGetFilterTransaction = async (filter = {}) => {
    // Use JSON.stringify for the filter object as a single parameter
    return apiClient.get(`/transactions?filter=${encodeURIComponent(JSON.stringify(filter))}`);
  };

export const apiUpdateTransaction = async (id, payload) => apiClient.put(`/transactions/${id}`, payload, {
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiDeleteTransaction = async (id) => apiClient.delete(`/transactions/${id}`);

export const apiIncomeBalance = async () => apiClient.get("/transactions/balance");










// import { apiClient } from "./config";

// export const apiAddTransaction = async (payload) => apiClient.post("/add-transaction", payload);

// export const apiGetAllTransactions = async () => apiClient.get("/transactions")

// export const apiGetFilterTransaction = async (filter = {}) => apiClient.get(`/transactions? filter=${JSON.stringify (filter)}`);

// export const apiUpdateTransaction = async (id, payload) => apiClient.put(`/transactions/${id}`, payload, {
//     headers:{
//         "Content-Type":
//         "application/json",
//     },
//     });

//     export const apiDeleteTransaction = async (id) => apiClient.delete(`/transaction/${id}`);

//     export const apiIncomeBalance = async () => apiClient.get()
