'use client';

import { useState } from 'react';
import {
  CalendarDaysIcon,
  CheckIcon,
  MapPinIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type JobStatus = 'Urgent' | 'Normal' | 'Emergency';

type JobOwnerStatus = 'Following' | 'Accepted' | 'Canceled';
type AssignmentStatus = 'Pending' | 'Accepted' | 'Canceled' | 'Completed';

interface JobCard {
  id: number;
  customerName: string;
  postedAgo: string;
  status: JobStatus;
  ownerStatus: JobOwnerStatus;
  location: string;
  description: string;
  dateTime: string;
  budget: string;
  serviceLocation: string;
  contactNumber: string;
  assignmentStatus: AssignmentStatus;
  artisanName?: string;
  artisanRole?: string;
}

const statCards = [
  { title: 'Active Job Posts', value: '24', delta: '+6 this week', deltaTone: 'text-green-600' },
  { title: 'Confirmed Bookings', value: '18', delta: '+4 today', deltaTone: 'text-green-600' },
  { title: 'Pending Bookings', value: '12', delta: '-2 waiting confirmation', deltaTone: 'text-red-500' },
  { title: 'Completed Jobs', value: '156', delta: '+23 this month', deltaTone: 'text-green-600' },
  { title: 'Total Revenue', value: 'N2.48M', delta: '+18%', deltaTone: 'text-green-600' },
  { title: 'Urgent Jobs', value: '8', delta: 'Requires immediate attention', deltaTone: 'text-green-600' },
];

const tabs = ['All Jobs', 'Active Jobs', 'Booking', 'Completed'];

const jobs: JobCard[] = [
  {
    id: 1,
    customerName: 'Asiya Jafir',
    postedAgo: 'Posted 2 hours ago',
    status: 'Urgent',
    ownerStatus: 'Following',
    location: 'Home Installation',
    description:
      'Installation of ceiling fans in 3 bedrooms and the living room. I have already purchased the fans, just need professional installation and wiring connections.',
    dateTime: 'Jan 9, 2026 • Afternoon (12PM - 5PM)',
    budget: '24,000 - 60,000 NGN',
    serviceLocation: 'Tudun Wada, Kaduna',
    contactNumber: '+234 807 123 4567',
    assignmentStatus: 'Pending',
  },
  {
    id: 2,
    customerName: 'Adman Adman',
    postedAgo: 'Posted 2 hours ago',
    status: 'Urgent',
    ownerStatus: 'Following',
    location: 'Plumber',
    description:
      'I need a plumber to install fixtures in three bathrooms and the kitchen. I have already bought the fixtures; I just require professional installation and plumbing connections.',
    dateTime: 'Jan 9, 2026 • Afternoon (12PM - 5PM)',
    budget: '24,000 - 60,000 NGN',
    serviceLocation: 'Tudun Wada, Kaduna',
    contactNumber: '+234 807 123 4567',
    assignmentStatus: 'Accepted',
    artisanName: 'Aminu Bello',
    artisanRole: 'Electrician',
  },
  {
    id: 3,
    customerName: 'Adman Adman',
    postedAgo: 'Posted 2 hours ago',
    status: 'Urgent',
    ownerStatus: 'Following',
    location: 'Plumber',
    description:
      'I need a plumber to install fixtures in three bathrooms and the kitchen. I have already bought the fixtures; I just require professional installation and plumbing connections.',
    dateTime: 'Jan 9, 2026 • Afternoon (12PM - 5PM)',
    budget: '24,000 - 60,000 NGN',
    serviceLocation: 'Tudun Wada, Kaduna',
    contactNumber: '+234 807 123 4567',
    assignmentStatus: 'Canceled',
    artisanName: 'Marry jan',
    artisanRole: 'Electrician',
  },
];

const statusStyles: Record<JobStatus, string> = {
  Urgent: 'bg-amber-50 text-amber-600',
  Normal: 'bg-blue-50 text-blue-600',
  Emergency: 'bg-red-50 text-red-600',
};

const ownerStatusStyles: Record<JobOwnerStatus, string> = {
  Following: 'bg-green-100 text-green-700',
  Accepted: 'bg-emerald-100 text-emerald-700',
  Canceled: 'bg-rose-100 text-rose-600',
};

const assignmentStatusStyles: Record<AssignmentStatus, string> = {
  Pending: 'text-green-700',
  Accepted: 'text-green-600',
  Canceled: 'text-gray-400',
  Completed: 'text-blue-600',
};

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [userType, setUserType] = useState('select types');
  const [amountRange, setAmountRange] = useState('select amount');
  const [dateRange, setDateRange] = useState('select date');
  const [allStatus, setAllStatus] = useState('select status');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article key={card.title} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">{card.title}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-800">{card.value}</p>
            <p className={`mt-2 text-xs font-semibold ${card.deltaTone}`}>{card.delta}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold transition ${
                activeTab === tab ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 xl:max-w-4xl">
            <Dropdown
              id="jobs-user-types"
              label="User Types"
              value={userType}
              options={['select type', 'artisan', 'customer']}
              onChange={setUserType}
            />
            <Dropdown
              id="jobs-amount-range"
              label="Amount Range"
              value={amountRange}
              options={['select amount', '< ₦10k', '₦10k-50k', '₦50k-100k', '> ₦100k']}
              onChange={setAmountRange}
            />
            <Dropdown
              id="jobs-date-range"
              label="Date Range"
              value={dateRange}
              options={['select date', 'today', 'yesterday', 'this week', 'this month']}
              onChange={setDateRange}
            />
            <Dropdown
              id="jobs-all-status"
              label="All Status"
              value={allStatus}
              options={['select status', 'urgent', 'normal', 'emergency']}
              onChange={setAllStatus}
            />
          </div>

          <label className="relative w-full xl:max-w-sm">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="search user,artisan,rev..."
              className="h-11 w-full rounded-md border border-gray-200 bg-white px-4 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {jobs.map((job) => (
          <article key={job.id} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <header className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-amber-200" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{job.customerName}</p>
                  <p className="text-xs text-gray-400">{job.postedAgo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`rounded px-2 py-0.5 text-[10px] font-semibold ${statusStyles[job.status]}`}>{job.status}</p>
                <p className={`mt-1 rounded px-2 py-0.5 text-[10px] font-semibold ${ownerStatusStyles[job.ownerStatus]}`}>
                  {job.ownerStatus}
                </p>
              </div>
            </header>

            <div className="mt-3 space-y-2 text-xs text-gray-500">
              <p className="inline-flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {job.location}
              </p>
              <p className="line-clamp-3 text-gray-600">{job.description}</p>
            </div>

            <div className="mt-3 h-28 rounded-lg bg-linear-to-br from-amber-100 via-amber-200 to-yellow-100" />

            <div className="mt-3 space-y-1.5 text-xs text-gray-600">
              <p className="inline-flex items-center gap-1">
                <CalendarDaysIcon className="h-3.5 w-3.5 text-gray-400" />
                {job.dateTime}
              </p>
              <p className="inline-flex items-center gap-1">
                <WrenchScrewdriverIcon className="h-3.5 w-3.5 text-gray-400" />
                Estimated Budget
                <span className="font-semibold text-gray-700">{job.budget}</span>
              </p>
              <p>Service Location: {job.serviceLocation}</p>
              <p className="inline-flex items-center gap-1">
                <PhoneIcon className="h-3.5 w-3.5 text-gray-400" />
                Contact Number {job.contactNumber}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Call
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Message
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Directions
              </button>
            </div>

            <footer className="mt-3">
              {job.assignmentStatus === 'Pending' ? (
                <p className="w-full rounded-md bg-green-600 px-4 py-2 text-center text-xs font-semibold text-white">
                  Job Pending
                </p>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                    <div>
                      <p className="text-[11px] text-gray-500">Artisan</p>
                      <p className="text-sm font-semibold text-gray-800">{job.artisanName}</p>
                      <p className="text-xs text-gray-400">{job.artisanRole}</p>
                    </div>
                  </div>
                  <p className={`inline-flex items-center gap-1 text-xs font-semibold ${assignmentStatusStyles[job.assignmentStatus]}`}>
                    {job.assignmentStatus === 'Accepted' ? <CheckIcon className="h-3.5 w-3.5" /> : null}
                    {job.assignmentStatus}
                  </p>
                </div>
              )}
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}
