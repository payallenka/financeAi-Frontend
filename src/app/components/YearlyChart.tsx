"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getYearlySummary } from "../services/api"; // Assuming you have a similar API endpoint for yearly data
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function YearlyChart() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getYearlySummary(); // Fetch yearly data
      setChartData({ labels: data.labels, values: data.values });
    } catch (error) {
      console.error("Error fetching yearly summary:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white h-80"> {/* Set fixed height */}
      <h2 className="text-lg font-semibold mb-2">Yearly Expenses</h2>
      <Line
        data={{
          labels: chartData.labels, // These would be years or similar
          datasets: [
            {
              label: "Yearly Expenses",
              data: chartData.values,
              borderColor: "#FF5733", // You can change color to fit your design
              backgroundColor: "rgba(255, 87, 51, 0.2)",
              fill: true,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
