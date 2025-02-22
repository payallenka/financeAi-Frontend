"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getMonthlySummary } from "../services/api";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function MonthlyChart() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMonthlySummary();
      setChartData({ labels: data.labels, values: data.values });
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-80"> {/* Set fixed height */}
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Monthly Expenses",
              data: chartData.values,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
