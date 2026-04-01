'use client';

import { useMemo, useState } from 'react';
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type ReviewTab = 'All Feedback' | 'Reviews' | 'Complaints' | 'Escalated';
type ReviewBadge = 'Review' | 'Complaint';
type ResolutionBadge = 'Resolved' | 'Pending';

interface ReviewItem {
  id: number;
  name: string;
  role: 'Customer' | 'Artisan';
  timeAgo: string;
  rating: number;
  category: string;
  text: string;
  badge: ReviewBadge;
  resolution: ResolutionBadge;
  job: string;
  customer: string;
  artisan: string;
  submitted: string;
}

const statCards = [
  { label: 'Total Reviews', value: '284', delta: '+12 this month', deltaTone: 'text-green-600' },
  { label: 'Positive Reviews', value: '241', delta: '84.8% of total', deltaTone: 'text-green-600' },
  { label: 'Negative Reviews', value: '43', delta: '+15% of total', deltaTone: 'text-red-500' },
  { label: 'Open Complaints', value: '28', delta: '3 from last week', deltaTone: 'text-red-500' },
  { label: 'Escalated Issues', value: '4', delta: 'Requires immediate attention', deltaTone: 'text-gray-500' },
];

const tabs: ReviewTab[] = ['All Feedback', 'Reviews', 'Complaints', 'Escalated'];

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Asiya Jafir',
    role: 'Customer',
    timeAgo: '2 days ago',
    rating: 2,
    category: 'Plumber',
    text: 'Excellent service! The artisan was professional and completed the job on time. The ceiling fans work perfectly. Highly recommend!',
    badge: 'Review',
    resolution: 'Resolved',
    job: 'Wooden Dining Table',
    customer: 'Asiya Aliya',
    artisan: 'Aminu Bello',
    submitted: '@ days ago',
  },
  {
    id: 2,
    name: 'Abdul Jafir',
    role: 'Customer',
    timeAgo: '2 days ago',
    rating: 2,
    category: 'Plumber',
    text: 'Excellent service! The artisan was professional and completed the job on time. The ceiling fans work perfectly. Highly recommend!',
    badge: 'Review',
    resolution: 'Resolved',
    job: 'Bathroom Fixtures',
    customer: 'Abdul Jafir',
    artisan: 'Aminu Bello',
    submitted: '@ days ago',
  },
  {
    id: 3,
    name: 'Asiya Jafir',
    role: 'Customer',
    timeAgo: '2 days ago',
    rating: 2,
    category: 'Plumber',
    text: 'Excellent service! The artisan was professional and completed the job on time. The ceiling fans work perfectly. Highly recommend!',
    badge: 'Review',
    resolution: 'Resolved',
    job: 'Kitchen Sink Repair',
    customer: 'Asiya Aliya',
    artisan: 'Aminu Bello',
    submitted: '@ days ago',
  },
  {
    id: 4,
    name: 'Asiya Jafir',
    role: 'Customer',
    timeAgo: '2 days ago',
    rating: 1,
    category: 'Plumber',
    text: 'Excellent service! The artisan was professional and completed the job on time. The ceiling fans work perfectly. Highly recommend!',
    badge: 'Complaint',
    resolution: 'Pending',
    job: 'Wooden Dining Table',
    customer: 'Asiya Aliya',
    artisan: 'Aminu Bello',
    submitted: '@ days ago',
  },
];

const badgeStyles: Record<ReviewBadge, string> = {
  Review: 'text-green-600',
  Complaint: 'text-amber-500',
};

const resolutionStyles: Record<ResolutionBadge, string> = {
  Resolved: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
};

function stars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index < rating;
    return (
      <StarIcon key={index} className={`h-3.5 w-3.5 ${filled ? 'text-amber-400' : 'text-gray-300'}`} />
    );
  });
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<ReviewTab>('All Feedback');
  const [userFilter, setUserFilter] = useState('all user');
  const [ratingFilter, setRatingFilter] = useState('5 stars');
  const [search, setSearch] = useState('');
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const activeReview = useMemo(
    () => reviews.find((item) => item.id === activeReviewId) ?? null,
    [activeReviewId]
  );

  function closeModal() {
    setActiveReviewId(null);
    setResolutionNote('');
  }

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article key={card.label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">{card.label}</p>
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
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:max-w-sm">
            <Dropdown
              id="reviews-user"
              label="User"
              value={userFilter}
              options={['all user', 'customer', 'artisan']}
              onChange={setUserFilter}
            />
            <Dropdown
              id="reviews-rating"
              label="All Rating"
              value={ratingFilter}
              options={['5 stars', '4 stars', '3 stars', '2 stars', '1 star']}
              onChange={setRatingFilter}
            />
          </div>

          <label className="relative w-full xl:max-w-sm">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="search user,artisan,rev..."
              className="h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((item) => (
          <article key={item.id} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <header className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-amber-200" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.role} · {item.timeAgo}</p>
                  <div className="mt-1 flex items-center">{stars(item.rating)}</div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-semibold ${badgeStyles[item.badge]}`}>{item.badge}</p>
                <p className={`mt-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${resolutionStyles[item.resolution]}`}>
                  {item.resolution}
                </p>
              </div>
            </header>

            <p className="mt-2 inline-flex items-center gap-1 text-xs text-gray-600">
              <BriefcaseIcon className="h-3.5 w-3.5 text-gray-400" />
              {item.category}
            </p>

            <p className="mt-2 rounded-md bg-[#f5f0e2] px-2.5 py-2 text-xs text-gray-700">{item.text}</p>

            <div className="mt-3 h-24 rounded-lg bg-linear-to-br from-amber-100 via-amber-200 to-yellow-100" />

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveReviewId(item.id)}
                className="inline-flex items-center justify-center gap-1 rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                {/* <ExclamationTriangleIcon className="h-3.5 w-3.5" /> */}
                <EyeIcon className="w-5 h-5" />
                View
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1 rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
                Message
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1 rounded border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
              >
                <FlagIcon className="h-3.5 w-3.5" />
                Flag
              </button>
            </div>
          </article>
        ))}
      </section>

      {activeReview ? (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close review modal"
            onClick={closeModal}
            className="absolute inset-0 bg-black/45"
          />

          <section className="absolute right-0 top-0 z-10 h-full w-full max-w-130 overflow-hidden bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Resolve Complaint</h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-4 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-amber-200" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{activeReview.name}</p>
                      <p className="text-xs text-gray-400">{activeReview.role} · {activeReview.timeAgo}</p>
                      <div className="mt-1 flex items-center">{stars(activeReview.rating)}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-xs font-semibold ${badgeStyles[activeReview.badge]}`}>{activeReview.badge}</p>
                    <p className={`mt-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${resolutionStyles[activeReview.resolution]}`}>
                      {activeReview.resolution}
                    </p>
                  </div>
                </div>

                <p className="mt-3 inline-flex items-center gap-1 text-base text-gray-700">
                  <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                  {activeReview.category}
                </p>

                <p className="mt-3 rounded-md bg-[#f5f0e2] px-3 py-2 text-sm text-gray-700">{activeReview.text}</p>

                <dl className="mt-4 divide-y divide-gray-100">
                  <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                    <dt className="text-base text-gray-500">Job</dt>
                    <dd className="text-base font-medium text-gray-800">{activeReview.job}</dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                    <dt className="text-base text-gray-500">Customer</dt>
                    <dd className="text-base font-medium text-gray-800">{activeReview.customer}</dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                    <dt className="text-base text-gray-500">Artisan</dt>
                    <dd className="text-base font-medium text-gray-800">{activeReview.artisan}</dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                    <dt className="text-base text-gray-500">Submitted</dt>
                    <dd className="text-base font-medium text-gray-800">{activeReview.submitted}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <label htmlFor="resolution-notes" className="text-base font-semibold text-gray-800">
                    Resolution Notes
                  </label>
                  <textarea
                    id="resolution-notes"
                    value={resolutionNote}
                    onChange={(event) => setResolutionNote(event.target.value)}
                    className="mt-2 h-28 w-full resize-none rounded-xl border border-gray-200 p-3 text-base text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <footer className="border-t border-gray-200 px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="rounded-xl border border-green-300 px-9 py-2 text-base font-semibold text-green-600 hover:bg-green-50"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-red-300 px-9 py-2 text-base font-semibold text-red-500 hover:bg-red-50"
                  >
                    Block amount
                  </button>
                </div>
              </footer>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
