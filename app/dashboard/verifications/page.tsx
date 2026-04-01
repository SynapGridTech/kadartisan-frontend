'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

interface VerificationRow {
  id: number;
  name: string;
  email: string;
  issue: string;
  verification: string;
  type: 'Artisan' | 'Customer';
  submitted: string;
  priority: 'High' | 'Medium' | 'Low';
}

const summaryCards = [
  { title: 'Total pending', value: '24', delta: '+6 today' },
  { title: 'ID review', value: '12', delta: '-2 from yesterday' },
  { title: 'Address proof same', value: '4', delta: 'Some' },
  { title: 'Failed Transactions', value: '3', delta: '15.0% reduced' },
];

const rows: VerificationRow[] = [
  {
    id: 1,
    name: 'Abdullahi Textile & Fabric',
    email: 'abdullahi.sani@email.com',
    issue: 'URGENT: ID expired',
    verification: '2nd Verification',
    type: 'Artisan',
    submitted: '2026-02-01',
    priority: 'High',
  },
  {
    id: 2,
    name: "Ade's Bakery",
    email: 'ade.adesina@email.com',
    issue: 'Missing: Business cert',
    verification: '1st Verification',
    type: 'Artisan',
    submitted: '25 Min Ago',
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Asiya Abdullahi',
    email: 'asiyaabdullahi@email.com',
    issue: 'High-value applicant',
    verification: '2nd Verification',
    type: 'Customer',
    submitted: '25 Min Ago',
    priority: 'Medium',
  },
  {
    id: 4,
    name: 'Yusuf Leather',
    email: 'yusuf.bello@email.com',
    issue: '2nd submission',
    verification: '1st Verification',
    type: 'Artisan',
    submitted: '25 Min Ago',
    priority: 'Low',
  },
  {
    id: 5,
    name: "Grace's Pottery",
    email: 'grace.nwachukwu@email.com',
    issue: 'All docs valid',
    verification: '1st Verification',
    type: 'Artisan',
    submitted: '25 Min Ago',
    priority: 'High',
  },
  {
    id: 6,
    name: 'Chioma Eze',
    email: 'chioma.eze@email.com',
    issue: 'Phone verified',
    verification: '1st Verification',
    type: 'Customer',
    submitted: '25 Min Ago',
    priority: 'Low',
  },
];

const priorityDot = {
  High: 'bg-red-500',
  Medium: 'bg-amber-400',
  Low: 'bg-green-500',
};

export default function VerificationsPage() {
  const [userType, setUserType] = useState('all user');
  const [dateRange, setDateRange] = useState('all date');
  const [priority, setPriority] = useState('high');
  const [search, setSearch] = useState('');
  const [selectedReview, setSelectedReview] = useState<VerificationRow | null>(null);
  const [documentPreview, setDocumentPreview] = useState<{
    title: string;
    documentType: 'nin' | 'business';
  } | null>(null);
  const [note, setNote] = useState('');

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article key={card.title} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white">
                <UserGroupIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-semibold text-gray-900 leading-none mt-1">{card.value}</p>
                <p className="mt-1 text-xs text-green-600">{card.delta}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 xl:max-w-2xl">
          <Dropdown
            id="verification-user-type"
            label="User types"
            value={userType}
            options={['all user', 'artisan', 'customer']}
            onChange={setUserType}
          />
          <Dropdown
            id="verification-date-range"
            label="Date range"
            value={dateRange}
            options={['all date', 'today', 'this week', 'this month']}
            onChange={setDateRange}
          />
          <Dropdown
            id="verification-priority"
            label="Priority"
            value={priority}
            options={['high', 'medium', 'low']}
            onChange={setPriority}
          />
        </div>

        <label className="relative w-full xl:max-w-sm">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search user,artisan,revenue"
            className="h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-green-500 text-left text-white">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/80 bg-transparent" />
                </th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Verification</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Document</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-gray-300" />
                      <div>
                        <p className="font-semibold text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                        <p className="text-xs text-red-500">{row.issue}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.verification}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">{row.type}</span>
                  </td>
                  <td className="px-4 py-3">{row.submitted}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${priorityDot[row.priority]}`} />
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">Document</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedReview(row)}
                      className="rounded-full border border-gray-200 px-5 py-1.5 text-sm hover:bg-gray-50"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedReview && !documentPreview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close verification modal"
            onClick={() => {
              setSelectedReview(null);
              setDocumentPreview(null);
              setNote('');
            }}
            className="absolute inset-0 bg-black/45"
          />

          <section className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
            <header className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-800">Reviewing: {selectedReview.name}</h2>
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setDocumentPreview(null);
                  setNote('');
                }}
                className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
              <div className="flex justify-center">
                <div className="h-40 w-40 rounded-full bg-gray-200" />
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Name:</p>
                  <p className="text-gray-600">Abdullahi Sani</p>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Business:</p>
                  <p className="text-gray-600">Textile &amp; Fabric</p>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Type:</p>
                  <p className="text-gray-600">{selectedReview.type}</p>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Location:</p>
                  <p className="text-gray-600">Kaduna, Nigeria</p>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">NIN ID:</p>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setDocumentPreview({
                          title: 'NIN ID Document',
                          documentType: 'nin',
                        })
                      }
                      className="rounded-full border border-gray-200 px-5 py-1 text-green-600 hover:bg-gray-50"
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Business cert:</p>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setDocumentPreview({
                          title: 'Business Certificate',
                          documentType: 'business',
                        })
                      }
                      className="rounded-full border border-gray-200 px-5 py-1 text-green-600 hover:bg-gray-50"
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4">
                  <p className="font-semibold text-gray-700">Address:</p>
                  <p className="text-gray-600">No.31 Ungwari Sarki Kaduna</p>
                </div>
              </div>
            </div>

            <footer className="mt-8 flex flex-col gap-4">
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Write something (optional)"
                className="h-24 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="h-10 rounded-full bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700">
                Send a note
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {selectedReview && documentPreview ? (
        <div className="fixed inset-0 z-60 p-2 sm:p-4">
          <button
            type="button"
            aria-label="Close document preview"
            onClick={() => setDocumentPreview(null)}
            className="absolute inset-0 bg-black/85"
          />

          <section className="relative mx-auto flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-[#141414] text-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-medium text-white/90">{documentPreview.title}</p>
              <button
                type="button"
                onClick={() => setDocumentPreview(null)}
                className="rounded-md p-1 text-white/90 transition hover:bg-white/10"
              >
                <XMarkIcon className="h-10 w-10" />
              </button>
            </header>

            <div className="flex-1 overflow-auto bg-[#0f0f0f] p-3 sm:p-5">
              <div className="mx-auto h-[78vh] w-full max-w-4xl overflow-hidden rounded bg-white shadow-lg">
                <iframe
                  src="/docs/original.pdf"
                  title={documentPreview.documentType === 'nin' ? 'NIN document' : 'Business certificate'}
                  className="h-full w-full"
                />
              </div>
            </div>

            <footer className="border-t border-white/10 px-4 py-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  className="rounded-full bg-green-600 px-7 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Approved
                </button>
                <button
                  type="button"
                  className="rounded-full border border-gray-400 px-7 py-2 text-sm font-medium text-gray-200 hover:border-gray-200 hover:text-white"
                >
                  Request re-upload
                </button>
                <button
                  type="button"
                  className="rounded-full border border-red-500 px-7 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  Reject
                </button>
              </div>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
