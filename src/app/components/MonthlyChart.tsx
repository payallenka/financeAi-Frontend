"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getMonthlySummary } from "../services/api";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function MonthlyChart() {
  const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMonthlySummary();
      if (data && Array.isArray(data.months) && Array.isArray(data.values)) {
        setChartData({ labels: data.months, values: data.values });
      } else {
        console.error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-80">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : chartData.labels.length > 0 ? (
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
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
}
