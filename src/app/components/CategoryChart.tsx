"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getCategorySummary } from "../services/api";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CategoryChart() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCategorySummary();
      setChartData({ labels: data.labels, values: data.values });
    } catch (error) {
      console.error("Error fetching category summary:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-80"> {/* Set fixed height */}
      <h2 className="text-lg font-semibold mb-2">Category-wise Expenses</h2>
      <Bar
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Total Spent",
              data: chartData.values,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
