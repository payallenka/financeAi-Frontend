import { auth } from "../firebase";

const API_URL = "http://127.0.0.1:8000/api/transactions/";

// ✅ Helper function to get Firebase token and user ID
async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");
  
  const token = await user.getIdToken(); // Get Firebase token
  const userId = user.uid; // Get Firebase UID
  
  // ✅ Debugging output
  console.log("🔥 Firebase Token:", token);
  console.log("🆔 User ID:", userId);

  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// ✅ Fetch all transactions
export async function getTransactions() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}?user_id=${auth.currentUser?.uid}`, { headers }); // 🔥 Sending `user_id` in query params
  if (!res.ok) throw new Error("Failed to fetch transactions.");
  return res.json();
}

// ✅ Fetch a single transaction by UUID
export async function getTransactionById(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${id}/?user_id=${auth.currentUser?.uid}`, { headers }); // 🔥 Sending `user_id` in query params
  if (!res.ok) throw new Error("Transaction not found.");
  return res.json();
}

// ✅ Fix: Include `user_id` in the body for `POST` requests
export async function addTransaction(transactionData: { description: string; amount: number }) {
  const headers = await getAuthHeaders();
  const userId = auth.currentUser?.uid; // ✅ Get user ID

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...transactionData,
      user_id: userId, // ✅ Send user_id in the request body
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("🚨 Error adding transaction:", errorData);
    throw new Error(errorData.detail || "Failed to add transaction");
  }

  return response.json();
}

// ✅ Delete a transaction
export async function deleteTransaction(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${id}/?user_id=${auth.currentUser?.uid}`, { method: "DELETE", headers }); // 🔥 Send user_id in query params
  if (!res.ok) throw new Error("Failed to delete transaction.");
}

// ✅ Update an existing transaction
export async function updateTransaction(transaction: { id: string; description: string; amount: number }) {
  const headers = await getAuthHeaders();
  const userId = auth.currentUser?.uid;

  const res = await fetch(`${API_URL}${transaction.id}/`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      ...transaction,
      user_id: userId, // ✅ Send user_id in the request body
    }),
  });

  if (!res.ok) throw new Error("Failed to update transaction.");
}

// ✅ Fetch the category summary
export async function getCategorySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}category_summary/?user_id=${auth.currentUser?.uid}`, { headers }); // 🔥 Send user_id in query params
  if (!res.ok) throw new Error("Failed to fetch category summary.");
  return res.json();
}

// ✅ Fetch the monthly summary
export async function getMonthlySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}monthly_summary/?user_id=${auth.currentUser?.uid}`, { headers }); // 🔥 Send user_id in query params
  if (!res.ok) throw new Error("Failed to fetch monthly summary.");
  return res.json();
}

// ✅ Fetch the yearly summary
export async function getYearlySummary() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}yearly_summary/?user_id=${auth.currentUser?.uid}`, { headers }); // 🔥 Send user_id in query params
  if (!res.ok) throw new Error("Failed to fetch yearly summary.");
  return res.json();
}
