'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const chartData: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: 'Target users',
      data: [90, 90, 90, 90, 90, 90, 90],
      backgroundColor: '#E5E7EB',
      borderRadius: 999,
      borderSkipped: false,
      barThickness: 6,
    },
    {
      label: 'Actual users',
      data: [56, 56, 56, 56, 56, 56, 56],
      backgroundColor: '#16A34A',
      borderRadius: 999,
      borderSkipped: false,
      barThickness: 6,
    },
  ],
};

const chartOptions: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      border: { display: false },
      ticks: {
        color: '#4B5563',
        font: { size: 12 },
      },
    },
    y: {
      min: 10,
      max: 100,
      ticks: {
        stepSize: 10,
        color: '#374151',
        font: { size: 12 },
      },
      grid: { display: false, drawBorder: false },
      border: { display: false },
    },
  },
};

interface TotalUserChartProps {
  className?: string;
}

export default function TotalUserChart({ className = 'lg:col-span-2' }: TotalUserChartProps) {
  return (
    <div className={`${className} rounded-lg bg-white p-6 shadow-sm`}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Total Users</h2>
        <div className="flex gap-2">
          {['7 Days', '30 Days', 'Custom'].map((period, index) => (
            <button
              key={period}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                index === 0 ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 rounded-lg bg-gray-50 p-3">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
