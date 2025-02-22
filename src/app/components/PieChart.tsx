"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getCategorySummary } from "../services/api"; // Assuming you have an API to fetch category-wise data
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPieChart() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCategorySummary(); // Fetch category-wise data
      setChartData({ labels: data.labels, values: data.values });
    } catch (error) {
      console.error("Error fetching category statistics:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-80">
      <h2 className="text-lg font-semibold mb-2">Category-wise Transactions</h2>
      <Pie
        data={{
          labels: chartData.labels, // These would be the categories (e.g., 'Food', 'Entertainment', etc.)
          datasets: [
            {
              label: "Category-wise Transactions",
              data: chartData.values,
              backgroundColor: [
                "#FF6384", // Red
                "#36A2EB", // Blue
                "#FFCE56", // Yellow
                "#4BC0C0", // Teal
                "#9966FF", // Purple
                "#FF9F40", // Orange
              ],
              hoverOffset: 4,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
