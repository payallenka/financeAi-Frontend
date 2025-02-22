"use client";

import CategoryChart from "../../app/components/CategoryChart";
import MonthlyChart from "../../app/components/MonthlyChart";
import YearlyChart from "../../app/components/YearlyChart";
import PieChart from "../../app/components/PieChart";

export default function FinanceVisualization() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Finance Visualization</h1>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CategoryChart />
        <MonthlyChart />
        <YearlyChart/>
        <PieChart/>
      </div>
    </div>
  );
}
