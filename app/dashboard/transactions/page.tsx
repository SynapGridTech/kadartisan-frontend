'use client';

import { useMemo, useState } from 'react';
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  ReceiptPercentIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Dispatched' | 'Refund';
type TransactionType = 'Payment' | 'Withdraw' | 'Payout';

interface TransactionRow {
  id: string;
  user: string;
  role: string;
  type: TransactionType;
  amount: number;
  fee: number;
  status: TransactionStatus;
  time: string;
  created: string;
}

const statCards = [
  { label: 'Today', value: 'N2.4M', growth: '+18%' },
  { label: 'This week', value: 'N2.4M', growth: '+18%' },
  { label: 'Success rate', value: 'N2.4M', growth: '+18%' },
  { label: 'Disputes', value: 'N2.4M', growth: '+18%' },
];

const summaryChips = [
  {
    icon: ArrowTrendingUpIcon,
    title: 'Payout volume up 23%',
    subtitle: 'this week vs last',
  },
  {
    icon: ExclamationTriangleIcon,
    title: '8 transactions stuck >2h',
    subtitle: 'pending approval',
  },
  {
    icon: BanknotesIcon,
    title: '3 artisans failing',
    subtitle: 'repeated payout errors',
  },
  {
    icon: ClockIcon,
    title: '92% of daily goal',
    subtitle: 'N2.3M / N2.5M',
  },
];

const rows: TransactionRow[] = [
  {
    id: 'T2381',
    user: 'Amara Textile',
    role: 'Amara Okafor · Artisan',
    type: 'Payment',
    amount: 45200,
    fee: 2260,
    status: 'Completed',
    time: '10:23 AM',
    created: 'Mar 15, 10:23 AM',
  },
  {
    id: 'T2382',
    user: "Bola's Bakery",
    role: 'Bola Adeyemi · Baker',
    type: 'Payment',
    amount: 30000,
    fee: 1500,
    status: 'Pending',
    time: '11:15 AM',
    created: 'Mar 15, 11:15 AM',
  },
  {
    id: 'T2383',
    user: "Chike's Crafts",
    role: 'Chike Nwankwo · Craftsman',
    type: 'Withdraw',
    amount: 22500,
    fee: 1125,
    status: 'Failed',
    time: '01:45 PM',
    created: 'Mar 15, 01:45 PM',
  },
  {
    id: 'T2384',
    user: "Dara's Designs",
    role: 'Dara Ibe · Designer',
    type: 'Payment',
    amount: 50750,
    fee: 2537,
    status: 'Dispatched',
    time: '02:30 PM',
    created: 'Mar 15, 02:30 PM',
  },
  {
    id: 'T2385',
    user: "Efe's Electronics",
    role: 'Efe Okwu · Technician',
    type: 'Payout',
    amount: 35400,
    fee: 1770,
    status: 'Refund',
    time: '03:05 PM',
    created: 'Mar 15, 03:05 PM',
  },
  {
    id: 'T2386',
    user: "Fola's Fabrics",
    role: 'Fola Adebayo · Tailor',
    type: 'Payment',
    amount: 40600,
    fee: 2030,
    status: 'Completed',
    time: '04:00 PM',
    created: 'Mar 15, 04:00 PM',
  },
];

const statusColor: Record<TransactionStatus, string> = {
  Completed: 'text-green-600',
  Pending: 'text-amber-500',
  Failed: 'text-red-500',
  Dispatched: 'text-orange-500',
  Refund: 'text-rose-500',
};

const actionButtons = [
  { label: 'Approve', icon: CheckIcon },
  { label: 'Flag', icon: FlagIcon },
  { label: 'Refund', icon: ArrowTrendingUpIcon },
  { label: 'Contact', icon: PhoneIcon },
  { label: 'Note', icon: ReceiptPercentIcon },
];

const currency = new Intl.NumberFormat('en-NG', {
  maximumFractionDigits: 0,
});

function formatNaira(value: number): string {
  return `N${currency.format(value)}`;
}

export default function TransactionsPage() {
  const [allTypes, setAllTypes] = useState('select type');
  const [amountRange, setAmountRange] = useState('select amount');
  const [dateRange, setDateRange] = useState('select date');
  const [allStatus, setAllStatus] = useState('select status');
  const [search, setSearch] = useState('');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTransactionId, setActiveTransactionId] = useState<string>('');

  const activeTransaction = useMemo(
    () => rows.find((row) => row.id === activeTransactionId) ?? null,
    [activeTransactionId]
  );

  const selectedCount = selectedIds.length;

  function toggleSelected(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function closeTransactionPanel() {
    setActiveTransactionId('');
  }

  return (
    <div className="relative space-y-5">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article key={card.label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-800">{card.value}</p>
            <p className="mt-2 text-xs font-semibold text-green-600">↗ {card.growth}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 xl:max-w-4xl">
          <Dropdown
            id="tx-all-types"
            label="All types"
            value={allTypes}
            options={['select type', 'withdraw', 'payout', 'payment']}
            onChange={setAllTypes}
          />
          <Dropdown
            id="tx-amount-range"
            label="Amount range"
            value={amountRange}
            options={['select amount', '< ₦10k', '₦10k-50k', '₦50k-100k', '> ₦100k']}
            onChange={setAmountRange}
          />
          <Dropdown
            id="tx-date-range"
            label="Date range"
            value={dateRange}
            options={['select date', 'today', 'yesterday', 'this week', 'this month']}
            onChange={setDateRange}
          />
          <Dropdown
            id="tx-all-status"
            label="All status"
            value={allStatus}
            options={['select status', 'competed', 'pending', 'failed', 'disputes']}
            onChange={setAllStatus}
          />
        </div>

        <label className="relative w-full xl:max-w-sm">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="search user,artisan,revenue"
            className="h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </section>

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-4">
        {summaryChips.map((chip) => {
          const Icon = chip.icon;
          return (
            <article
              key={chip.title}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{chip.title}</p>
                <p className="text-xs text-gray-500">{chip.subtitle}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-xs font-semibold text-green-600">{selectedCount} selected</p>
          <div className="flex flex-wrap items-center gap-2">
            {actionButtons.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-500 transition hover:bg-gray-50"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-green-600 text-left text-xs uppercase tracking-wide text-white">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/80 bg-transparent" />
                </th>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="w-8 px-4 py-3" aria-label="open details" />
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isChecked = selectedIds.includes(row.id);

                return (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                    onClick={() => setActiveTransactionId(row.id)}
                  >
                    <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelected(row.id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-700">{row.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-700">{row.user}</p>
                      <p className="text-xs text-gray-400">{row.role}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.type}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-700">{formatNaira(row.amount)}</p>
                      <p className="text-xs text-gray-400">Fee: {formatNaira(row.fee)}</p>
                    </td>
                    <td className={`px-4 py-3 font-semibold ${statusColor[row.status]}`}>{row.status}</td>
                    <td className="px-4 py-3 text-gray-700">{row.time}</td>
                    <td className="px-4 py-3 text-gray-400">
                      <ChevronRightIcon className="h-4 w-4" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {activeTransaction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-4">
          <button
            aria-label="Close transaction modal"
            onClick={closeTransactionPanel}
            className="absolute inset-0 bg-black/45"
          />

          <aside className="relative z-10 h-full max-h-[92vh] w-full max-w-95 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Transaction details</h2>
              <button
                type="button"
                onClick={closeTransactionPanel}
                className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              <dl className="divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Transaction ID</dt>
                  <dd className="font-semibold text-gray-700">{activeTransaction.id}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Amount</dt>
                  <dd className="font-semibold text-gray-700">{formatNaira(activeTransaction.amount)}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Fee</dt>
                  <dd className="font-semibold text-gray-700">{formatNaira(activeTransaction.fee)}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Net</dt>
                  <dd className="font-semibold text-gray-700">
                    {formatNaira(activeTransaction.amount - activeTransaction.fee)}
                  </dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Status</dt>
                  <dd className={`font-semibold ${statusColor[activeTransaction.status]}`}>{activeTransaction.status}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Created</dt>
                  <dd className="font-semibold text-gray-700">{activeTransaction.created}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                  <dt className="text-gray-500">Account</dt>
                  <dd className="text-right font-semibold text-gray-700">{activeTransaction.user} ({activeTransaction.role.split(' · ')[0]})</dd>
                </div>
              </dl>

              <section className="px-5 py-5">
                <h3 className="text-xl font-semibold text-gray-800">Timeline</h3>
                <ul className="mt-4 space-y-4 border-l border-gray-200 pl-4 text-sm">
                  <li className="relative flex items-center justify-between text-gray-700">
                    <span className="absolute -left-5.25 h-2 w-2 rounded-full bg-blue-600" />
                    <span>Initiated</span>
                    <span className="font-medium">{activeTransaction.created}</span>
                  </li>
                  <li className="relative flex items-center justify-between text-gray-700">
                    <span className="absolute -left-5.25 h-2 w-2 rounded-full bg-blue-600" />
                    <span>Fee calculated</span>
                    <span className="font-medium">+2min</span>
                  </li>
                  <li className="relative flex items-center justify-between text-gray-700">
                    <span className="absolute -left-5.25 h-2 w-2 rounded-full bg-blue-600" />
                    <span>Bank processing</span>
                    <span className="font-medium">+2min</span>
                  </li>
                  <li className="relative flex items-center justify-between text-gray-700">
                    <span className="absolute -left-5.25 h-2 w-2 rounded-full bg-blue-600" />
                    <span>Completed</span>
                    <span className="font-medium">+2min</span>
                  </li>
                </ul>
              </section>
            </div>

            <footer className="border-t border-gray-200 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                >
                  <ReceiptPercentIcon className="h-4 w-4" />
                  Receipt
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                >
                  <FlagIcon className="h-4 w-4" />
                  Flag
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
                >
                  <ReceiptPercentIcon className="h-4 w-4" />
                  Note
                </button>
              </div>
            </footer>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
