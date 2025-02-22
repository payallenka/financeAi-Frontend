import { auth } from "../firebase";

const API_URL = "http://127.0.0.1:8000/api/transactions/";

// Helper function to get Firebase token
async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const token = await user.getIdToken(); // Get Firebase token
  console.log(token)
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Fetch all transactions
export async function getTransactions() {
  const headers = await getAuthHeaders();
  const res = await fetch(API_URL, { headers });
  if (!res.ok) throw new Error("Failed to fetch transactions.");
  return res.json();
}

// Fetch a single transaction by UUID
export async function getTransactionById(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${id}/`, { headers });
  if (!res.ok) throw new Error("Transaction not found.");
  return res.json();
}

// Add a new transaction
export async function addTransaction(transaction: {
  description: string;
  amount: number;
}) {
  const headers = await getAuthHeaders();
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(transaction),
  });

  if (!res.ok) throw new Error("Failed to add transaction.");
}

// Delete a transaction
export async function deleteTransaction(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${id}/`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete transaction.");
}

// Update an existing transaction
export async function updateTransaction(transaction: {
  id: string;
  description: string;
  amount: number;
}) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${transaction.id}/`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      description: transaction.description,
      amount: transaction.amount,
    }),
  });

  if (!res.ok) throw new Error("Failed to update transaction.");
}

// Fetch the category summary
export async function getCategorySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch("http://localhost:8000/api/transactions/category_summary/", { headers });
  if (!res.ok) throw new Error("Failed to fetch category summary.");
  return res.json();
}

// Fetch the monthly summary
export async function getMonthlySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch("http://localhost:8000/api/transactions/monthly_summary/", { headers });
  if (!res.ok) throw new Error("Failed to fetch monthly summary.");
  return res.json();
}

// Fetch the yearly summary
export async function getYearlySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch("http://localhost:8000/api/transactions/yearly_summary/", { headers });
  if (!res.ok) throw new Error("Failed to fetch yearly summary.");
  return res.json();
}
