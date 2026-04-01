'use client';

import { useMemo, useState } from 'react';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

type DocCategory =
  | 'getting-started'
  | 'user-management'
  | 'operations'
  | 'settings'
  | 'support'
  | 'resources';

interface HelpDoc {
  id: string;
  title: string;
  category: DocCategory;
}

const docs: HelpDoc[] = [
  { id: 'welcome', title: 'Welcome To KadArtisan', category: 'getting-started' },
  { id: 'quick-start', title: 'Quick Start Guide', category: 'getting-started' },
  { id: 'dashboard-overview', title: 'Dashboard Overview', category: 'getting-started' },
  { id: 'manage-users', title: 'Managing Users', category: 'user-management' },
  { id: 'verification', title: 'Verification Process', category: 'user-management' },
  { id: 'roles', title: 'Admin Roles & Permissions', category: 'user-management' },
  { id: 'transactions', title: 'Managing Transactions', category: 'operations' },
  { id: 'jobs', title: 'Jobs & Bookings', category: 'operations' },
  { id: 'payouts', title: 'Processing Payouts', category: 'operations' },
  { id: 'general-settings', title: 'General Settings', category: 'settings' },
  { id: 'payment-config', title: 'Payment Configuration', category: 'settings' },
  { id: 'security-best', title: 'Security Best Practices', category: 'settings' },
  { id: 'common-issues', title: 'Common Issues', category: 'support' },
  { id: 'admin-faq', title: 'Admin FAQ', category: 'support' },
  { id: 'ticket-handling', title: 'Handling Support Tickets', category: 'support' },
  { id: 'glossary', title: 'Glossary Of Terms', category: 'resources' },
  { id: 'platform-updates', title: 'Platform Updates', category: 'resources' },
];

const categoryLabels: Record<DocCategory, string> = {
  'getting-started': 'GETTING STARTED',
  'user-management': 'USER MANAGEMENT',
  operations: 'OPERATIONS',
  settings: 'SETTINGS & CONFIGURATION',
  support: 'SUPPORT & TROUBLESHOOTING',
  resources: 'RESOURCES',
};

const topStats = [
  { label: 'Total Articles', value: '24', sub: '+3 this month' },
  { label: 'Categories', value: '6', sub: 'All covered' },
  { label: 'Last Updated', value: 'Today', sub: 'New content added' },
  { label: 'Total Views', value: '1,284', sub: '+24%' },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [activeDocId, setActiveDocId] = useState('welcome');

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  const groupedDocs = useMemo(() => {
    const groups: Record<DocCategory, HelpDoc[]> = {
      'getting-started': [],
      'user-management': [],
      operations: [],
      settings: [],
      support: [],
      resources: [],
    };

    filteredDocs.forEach((item) => groups[item.category].push(item));
    return groups;
  }, [filteredDocs]);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">Admin Help Docs</h1>
        <p className="mt-1 text-sm text-gray-600">Comprehensive guides and documentation for KadArtisan administrators</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{stat.value}</p>
            <p className="mt-2 text-xs text-green-600">{stat.sub}</p>
          </article>
        ))}
      </section>

      <section className="relative">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documentation... (e.g., verification, payments, settings)"
          className="h-11 w-full rounded-full border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{String.fromCharCode(9906)}</span>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <aside className="self-start rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          {Object.entries(groupedDocs).map(([categoryKey, items]) => (
            <div key={categoryKey} className="mb-3 last:mb-0">
              <p className="mb-1 px-2 text-[10px] font-semibold tracking-wide text-gray-400">{categoryLabels[categoryKey as DocCategory]}</p>
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = item.id === activeDocId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActiveDocId(item.id)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                          isActive ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        <BookOpenIcon className="h-4 w-4" />
                        {item.title}
                      </button>
                    </li>
                  );
                })}
                {items.length === 0 ? <li className="px-3 py-2 text-xs text-gray-400">No matching articles</li> : null}
              </ul>
            </div>
          ))}
        </aside>

        <article className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <header className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <h2 className="text-base font-semibold text-gray-800">Welcome To KadArtisan</h2>
            <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" /> Last updated: March 2026</span>
              <span className="inline-flex items-center gap-1"><CalendarDaysIcon className="h-3.5 w-3.5" /> Last reviewed: March 2026</span>
            </div>
          </header>

          <section className="rounded-lg border border-gray-200 p-3">
            <h3 className="text-sm font-semibold text-gray-700">In This Article:</h3>
            <ul className="mt-2 space-y-1 text-xs text-gray-500">
              <li>Platform Overview</li>
              <li>Key Features</li>
              <li>Getting Started</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800">Platform Overview</h3>
              <p className="mt-1">
                Welcome to KadArtisan, the premier marketplace connecting skilled artisans with customers across Nigeria.
                As an administrator, you play a crucial role in maintaining platform integrity.
              </p>
            </div>

            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-xs text-gray-600">
              <span className="font-semibold text-gray-700">Pro Tip:</span> Bookmark this documentation page for quick access to guides.
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Key Features Of The Admin Dashboard</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                <li><span className="font-semibold">Real-Time Analytics:</span> Monitor platform performance with live metrics.</li>
                <li><span className="font-semibold">User Management:</span> Verify artisans, manage accounts, handle disputes.</li>
                <li><span className="font-semibold">Transaction Oversight:</span> Track payments, process refunds, manage payouts.</li>
                <li><span className="font-semibold">Content Moderation:</span> Review and approve artisan profiles.</li>
                <li><span className="font-semibold">Settings Configuration:</span> Customize platform behavior and security.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Getting Started As An Admin</h3>
              <p className="mt-1 text-xs">
                After logging in, you will be directed to the overview dashboard. Review the sections requiring attention,
                including pending verifications and open complaints first.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 p-3">
            <h3 className="text-sm font-semibold text-gray-700">Related Articles</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <button type="button" className="inline-flex items-center gap-2 hover:text-green-700">
                <DocumentTextIcon className="h-4 w-4" /> Quick Start Guide
              </button>
              <button type="button" className="inline-flex items-center gap-2 hover:text-green-700">
                <UserGroupIcon className="h-4 w-4" /> Dashboard Overview
              </button>
            </div>
          </section>

          <footer className="rounded-lg border border-gray-200 p-3">
            <p className="text-center text-xs text-gray-500">Was this article helpful?</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <button type="button" className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-4 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                <HandThumbUpIcon className="h-3.5 w-3.5" /> Yes
              </button>
              <button type="button" className="inline-flex items-center gap-1 rounded-full border border-gray-300 px-4 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                <HandThumbDownIcon className="h-3.5 w-3.5" /> No
              </button>
            </div>
          </footer>

          <div className="flex items-center justify-end border-t border-gray-100 pt-3">
            <span className="inline-flex items-center gap-1 text-xs text-green-600">
              <CheckCircleIcon className="h-4 w-4" /> Documentation synced
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}
