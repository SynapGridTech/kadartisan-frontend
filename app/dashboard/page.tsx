'use client';

import { useMemo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
  changeLabel?: string;
}

const StatCard = ({ icon, label, value, change, isPositive, changeLabel }: StatCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-gray-600 text-sm mb-2">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% {changeLabel || ''}
        </p>
      </div>
      <div className="bg-yellow-100 p-3 rounded-lg">{icon}</div>
    </div>
  </div>
);

const ChartIcon = () => (
  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12V2M5 15h10M2 18h16" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const ProgressBar = ({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${(value / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default function Dashboard() {
  const stats = [
    {
      icon: <ChartIcon />,
      label: 'Total Customer',
      value: '1,2340',
      change: 12.5,
      isPositive: true,
    },
    {
      icon: <ChartIcon />,
      label: 'Total Artisan',
      value: '350',
      change: 12.5,
      isPositive: true,
    },
    {
      icon: <ChartIcon />,
      label: 'Active Jobs',
      value: '150',
      change: 10,
      isPositive: true,
      changeLabel: 'Improved by 10%',
    },
    {
      icon: <ChartIcon />,
      label: 'Failed Transactions',
      value: '8',
      change: 15.05,
      isPositive: false,
      changeLabel: 'reduced',
    },
    {
      icon: <ChartIcon />,
      label: 'Subscribers',
      value: '80',
      change: 5.9,
      isPositive: true,
      changeLabel: 'growth',
    },
    {
      icon: <ChartIcon />,
      label: 'Open Complaints',
      value: '1',
      change: 0.2,
      isPositive: true,
      changeLabel: 'Improved by 0.2 points',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 text-sm mt-1">Welcome back! Here's what's happening now</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <span className="text-sm font-medium text-gray-700">Month</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Users Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Total Users</h2>
            <div className="flex gap-2">
              {['7 Days', '30 Days', 'Custom'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-600">Total user Chart Visualization</p>
            </div>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Needs attention</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600 flex-1">Pending verifications</span>
              <span className="text-sm font-semibold text-gray-900">10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600 flex-1">Open complaints</span>
              <span className="text-sm font-semibold text-gray-900">10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600 flex-1">Subscriptions expiring in 7d</span>
              <span className="text-sm font-semibold text-gray-900">10</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600 flex-1">Escalated issues</span>
              <span className="text-sm font-semibold text-gray-900">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* New Users Today */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">New users today</h2>
          <div className="space-y-3">
            <div>
              <p className="text-3xl font-bold text-green-600">+14</p>
              <p className="text-sm text-gray-600">Artisans</p>
              <p className="text-xs text-green-600 mt-1">📈 vs yesterday</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-3xl font-bold text-gray-900">+4</p>
              <p className="text-sm text-gray-600">Customer</p>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <span className="text-xs text-gray-600">recent signups</span>
              <span className="text-xs text-primary font-medium">+1</span>
            </div>
          </div>
        </div>

        {/* Job Status Breakdown */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job status breakdown</h2>
          <div className="space-y-2">
            <ProgressBar label="Requested" value={4} total={30} color="bg-gray-400" />
            <ProgressBar label="In progress" value={12} total={30} color="bg-blue-500" />
            <ProgressBar label="Completed" value={10} total={30} color="bg-green-500" />
            <ProgressBar label="Cancelled" value={2} total={30} color="bg-red-500" />
          </div>
        </div>

        {/* Placeholder for additional card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
          <div className="text-center text-gray-500 py-8">
            <p>Additional metrics coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
