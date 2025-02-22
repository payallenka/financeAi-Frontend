import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTransactions();
      setTransactions(data);
    }
    fetchData();
  }, []);

  return transactions;
}
