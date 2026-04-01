'use client';

import { useState } from 'react';
import {
  BellAlertIcon,
  CheckCircleIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

const notifications = [
  {
    id: 1,
    title: 'Refund processed successfully',
    user: 'Chioma Eze',
    detail: "Refund processed | Customer: Chioma Eze • Artisan: Grace's Pottery",
    amount: 'Amount: N12,500 • Reason: item not received',
    location: 'Kaduna, Nigeria',
    time: 'March 15, 2026 • 10:23 AM',
    statusColor: 'bg-amber-500',
  },
  {
    id: 2,
    title: "New artisan registration: Amara's Textile Studio",
    user: 'Abdullahi Sani',
    detail: "Amara's Textile Studio (Artisan Akofa) registered and uploaded documents",
    amount: '',
    location: 'Kaduna, Nigeria',
    time: 'March 15, 2026 • 10:23 AM',
    statusColor: 'bg-red-500',
  },
  {
    id: 3,
    title: 'Bulk verification completed',
    user: 'Abdullahi Sani • Textile & Fabric Design',
    detail: 'Artisans automatically verified via ID scanner',
    amount: '',
    location: 'Kaduna, Nigeria',
    time: 'March 15, 2026 • 10:23 AM',
    statusColor: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Failed payout invalid bank details',
    user: 'Abdullahi Sani',
    detail: 'Failed payout: Artisan Jamilu Bello invalid bank details',
    amount: 'Attempts: 3x • Amount: N45,200',
    location: 'Kaduna, Nigeria',
    time: '1:20 PM • yesterday',
    statusColor: 'bg-red-500',
  },
  {
    id: 5,
    title: 'Weekly payouts completed',
    user: 'Weekly payouts completed successfully',
    detail: 'Total: N342,800 • 28 artisans paid',
    amount: '0 failures • 100% success reloaded now ID after previous rejection',
    location: 'Kaduna, Nigeria',
    time: '5:00 PM • 2 days ago',
    statusColor: 'bg-green-500',
  },
  {
    id: 6,
    title: 'Verification documents re-submitted',
    user: 'Grace Nwachukwu',
    detail: 'Customer verification failed previously, updated a valid ID card',
    amount: '',
    location: 'Kaduna, Nigeria',
    time: '8:55 AM • today',
    statusColor: 'bg-red-500',
  },
];

const categoryOptions = ['verification', 'subscription', 'payments', 'jobs', 'all'];
const priorityOptions = ['high', 'medium', 'low', 'all'];
const userTypeOptions = ['artisans', 'customers', 'all'];

export default function NotificationsPage() {
  const [category, setCategory] = useState('verification');
  const [priority, setPriority] = useState('high');
  const [userType, setUserType] = useState('artisans');

  return (
    <div className="space-y-6">
      {/* <section className="rounded-lg bg-white p-4 shadow-sm"> */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 lg:max-w-3xl">
            <Dropdown
              id="notification-category"
              label="Category"
              value={category}
              options={categoryOptions}
              onChange={setCategory}
            />

            <Dropdown
              id="notification-priority"
              label="Priority level"
              value={priority}
              options={priorityOptions}
              onChange={setPriority}
            />

            <Dropdown
              id="notification-user-type"
              label="Typical user types"
              value={userType}
              options={userTypeOptions}
              onChange={setUserType}
            />
          </div>

          <button className="inline-flex items-center justify-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors">
            Mark all as read
          </button>
        </div>
      {/* </section> */}

      <section className="space-y-3">
        {notifications.map((item) => (
          <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <BellAlertIcon className="h-4 w-4 text-green-600" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs font-medium text-gray-700">{item.user}</p>
                    <p className="text-xs text-gray-600">{item.detail}</p>
                    {item.amount ? <p className="text-xs text-gray-600">{item.amount}</p> : null}
                  </div>
                  <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.statusColor}`} />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                    <button className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      View File
                    </button>
                    <button className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors">
                      <PaperAirplaneIcon className="h-3.5 w-3.5" />
                      Send notification message
                    </button>
                  </div>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
