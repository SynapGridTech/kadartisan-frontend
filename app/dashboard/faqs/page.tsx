'use client';

import { useState } from 'react';
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type FaqTab = 'manage' | 'knowledge' | 'support' | 'tickets' | 'preferences';

type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

type TicketPriority = 'High' | 'Medium' | 'Low';

interface FaqSection {
  key: FaqTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TicketItem {
  id: string;
  user: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  created: string;
}

interface KnowledgeArticle {
  title: string;
  summary: string;
}

const sections: FaqSection[] = [
  { key: 'manage', label: 'Manage FAQs', icon: ClipboardDocumentListIcon },
  { key: 'knowledge', label: 'Knowledge Base', icon: QuestionMarkCircleIcon },
  { key: 'support', label: 'Support Resources', icon: ChatBubbleLeftRightIcon },
  { key: 'tickets', label: 'Support Tickets', icon: WrenchScrewdriverIcon },
  { key: 'preferences', label: 'Preferences', icon: ArrowPathIcon },
];

const topCards = [
  { label: 'Total FAQs', value: '24', sub: '+3 this month' },
  { label: 'Published', value: '18', sub: '75% of total' },
  { label: 'Drafts', value: '4', sub: 'Ready for review' },
  { label: 'Help Articles', value: '28', sub: '+2 this week' },
];

const faqs: FaqItem[] = [
  {
    question: 'How Do I Create An Artisan Account?',
    answer:
      'During signup, select Artisan Account, fill your profile, submit verification, and activate your account once approved.',
  },
  {
    question: 'How Long Does Verification Take?',
    answer:
      'Verification typically takes 24 to 48 hours after you submit complete information and valid documents.',
  },
  {
    question: 'What Is KadArtisan?',
    answer:
      'KadArtisan is a marketplace connecting skilled artisans with customers, including secure bookings and communication.',
  },
  {
    question: 'How Are Payment Fees Calculated?',
    answer:
      'A small platform commission is applied per completed transaction and shown transparently in payment details.',
  },
  {
    question: 'How Do I Receive My Payments?',
    answer:
      'Payouts are processed to your linked bank account based on payout schedule and account status.',
  },
  {
    question: 'How Do I Accept A Job?',
    answer:
      'Open jobs, review details, and click Accept. You can message customers before confirming final terms.',
  },
  {
    question: 'What Happens If I Need To Cancel A Booking?',
    answer:
      'Use the booking details screen to cancel and provide reason. Cancellation policy and applicable fees may apply.',
  },
  {
    question: 'What Payment Methods Are Accepted?',
    answer:
      'Customers can pay via bank transfer, card payments, and supported digital wallets integrated on the platform.',
  },
];

const knowledgeArticles: KnowledgeArticle[] = [
  { title: 'Getting Started Guide', summary: 'Complete guide for new artisans and customers' },
  { title: 'Save Changes', summary: 'Step-by-step verification process' },
  { title: 'Payment & Payout Guide', summary: 'Understanding fees, payouts, and withdrawals' },
  { title: 'Managing Your Bookings', summary: 'Tips for handling jobs and customer communication' },
  { title: 'Dispute Resolution', summary: 'How to handle customer complaints and disputes' },
  { title: 'Safety Tips', summary: 'Staying safe while using KadArtisan' },
];

const tickets: TicketItem[] = [
  {
    id: '#TKT-001',
    user: 'John Adeyemi',
    subject: 'Payment Not Received',
    priority: 'High',
    status: 'Open',
    created: '2 Hours Ago',
  },
  {
    id: '#TKT-002',
    user: 'Asiya Bello',
    subject: 'Verification Delay',
    priority: 'Medium',
    status: 'In Progress',
    created: '5 Hours Ago',
  },
  {
    id: '#TKT-003',
    user: 'Hassan Aliyu',
    subject: 'Account Suspended',
    priority: 'High',
    status: 'Open',
    created: '1 Hour Ago',
  },
  {
    id: '#TKT-004',
    user: 'Aliyu Bello',
    subject: 'Payout Issue',
    priority: 'Low',
    status: 'Resolved',
    created: '3 Hours Ago',
  },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-green-600' : 'bg-gray-300'
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function statusClass(status: TicketStatus): string {
  if (status === 'Resolved') return 'text-green-600';
  if (status === 'In Progress') return 'text-yellow-600';
  return 'text-orange-600';
}

function priorityClass(priority: TicketPriority): string {
  if (priority === 'Low') return 'text-green-600';
  if (priority === 'Medium') return 'text-yellow-600';
  return 'text-red-500';
}

export default function FaqsPage() {
  const [activeTab, setActiveTab] = useState<FaqTab>('manage');
  const [faqSearch, setFaqSearch] = useState('');
  const [ticketSearch, setTicketSearch] = useState('');
  const [showFaqHome, setShowFaqHome] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [faqSort, setFaqSort] = useState('newest');
  const [responseTarget, setResponseTarget] = useState('within 1 hour');

  const [filters, setFilters] = useState({
    all: true,
    general: false,
    account: false,
    payments: false,
    jobs: false,
  });

  const filteredFaqs = faqs.filter((item) => {
    const text = `${item.question} ${item.answer}`.toLowerCase();
    return text.includes(faqSearch.toLowerCase());
  });

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">FAQs & Support Center</h1>
        <p className="mt-1 text-sm text-gray-600">Manage frequently asked questions and support resources for your platform</p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {topCards.map((card) => (
          <article key={card.label} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="text-xs text-gray-400">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{card.value}</p>
            <p className="mt-2 text-xs text-green-600">{card.sub}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[290px_1fr]">
        <aside className="self-start rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <ul className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeTab === section.key;

              return (
                <li key={section.key}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(section.key)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                      isActive ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          {activeTab === 'manage' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">FAQ Preferences</h2>
                  <p className="text-xs text-gray-500">Control How FAQs Are Displayed To Users</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  <PlusIcon className="h-4 w-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={faqSearch}
                    onChange={(event) => setFaqSearch(event.target.value)}
                    placeholder="Search FAQs by question or answer..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setFilters({ all: true, general: false, account: false, payments: false, jobs: false })} className={`rounded-full px-3 py-1 text-xs font-medium ${filters.all ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}>All</button>
                  <button type="button" onClick={() => setFilters({ all: false, general: true, account: false, payments: false, jobs: false })} className={`rounded-full px-3 py-1 text-xs font-medium ${filters.general ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}>General</button>
                  <button type="button" onClick={() => setFilters({ all: false, general: false, account: true, payments: false, jobs: false })} className={`rounded-full px-3 py-1 text-xs font-medium ${filters.account ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}>Account & Verification</button>
                  <button type="button" onClick={() => setFilters({ all: false, general: false, account: false, payments: true, jobs: false })} className={`rounded-full px-3 py-1 text-xs font-medium ${filters.payments ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}>Payments & Fees</button>
                  <button type="button" onClick={() => setFilters({ all: false, general: false, account: false, payments: false, jobs: true })} className={`rounded-full px-3 py-1 text-xs font-medium ${filters.jobs ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}>Jobs & Bookings</button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Show FAQs On Homepage</p>
                      <p className="text-xs text-gray-500">Display Popular FAQs On The Main Landing Page</p>
                    </div>
                    <Toggle enabled={showFaqHome} onToggle={() => setShowFaqHome((v) => !v)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Auto-Suggest FAQs</p>
                      <p className="text-xs text-gray-500">Suggest Relevant FAQs Based On User Activity</p>
                    </div>
                    <Toggle enabled={autoSuggest} onToggle={() => setAutoSuggest((v) => !v)} />
                  </div>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-4">
                  {filteredFaqs.map((item, index) => (
                    <details key={`${item.question}-${index}`} className="group border-b border-gray-100 pb-3">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-gray-700 group-open:pb-2">{item.question}</summary>
                      <p className="text-xs leading-5 text-gray-500">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Preferences</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'knowledge' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Knowledge Base</h2>
                  <p className="text-xs text-gray-500">Help Articles And Guides For Users</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  <PlusIcon className="h-4 w-4" />
                  Add Article
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 md:grid-cols-2">
                {knowledgeArticles.map((article) => (
                  <article key={article.title} className="rounded-xl border border-gray-200 p-4">
                    <div className="mb-3 inline-flex rounded bg-green-100 p-1 text-green-600">
                      <QuestionMarkCircleIcon className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{article.summary}</p>
                    <button type="button" className="mt-4 text-xs font-semibold text-green-600 hover:text-green-700">Read more -&gt;</button>
                  </article>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reorder Articles</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'support' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Support Resources</h2>
                  <p className="text-xs text-gray-500">Help Articles And Guides For Users</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  <PlusIcon className="h-4 w-4" />
                  Add Article
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 md:grid-cols-3">
                {[
                  { title: 'Email Support', value: 'support@kadartisan.com' },
                  { title: 'Phone Support', value: '+234 800 123 4567' },
                  { title: 'WhatsApp', value: '+234 800 123 4567' },
                ].map((resource) => (
                  <article key={resource.title} className="rounded-xl border border-gray-200 p-4 text-center">
                    <div className="mx-auto mb-3 inline-flex rounded bg-green-100 p-1 text-green-600">
                      <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="font-semibold text-gray-700">{resource.title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{resource.value}</p>
                    <button type="button" className="mt-3 rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50">Edit</button>
                  </article>
                ))}
              </div>

              <label className="space-y-1 border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-gray-700">Support Hours</span>
                <input defaultValue="Monday - Friday: 9:00 AM - 6:00 PM (WAT)" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
              </label>

              <Dropdown
                id="response-target"
                label="Response Time Target"
                value={responseTarget}
                options={['within 1 hour', 'within 4 hours', 'within 24 hours', 'within 48 hours']}
                onChange={setResponseTarget}
              />

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'tickets' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Support Tickets</h2>
                <p className="text-xs text-gray-500">Manage Customer And Artisan Support Requests</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={ticketSearch}
                    onChange={(event) => setTicketSearch(event.target.value)}
                    placeholder="Search tickets by ID, user, or subject..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All Tickets', 'Open', 'Resolved', 'In Progress'].map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      className={`rounded-full px-3 py-1 text-xs font-medium ${index === 0 ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Ticket ID</th>
                        <th className="px-4 py-3 text-left font-semibold">User</th>
                        <th className="px-4 py-3 text-left font-semibold">Subject</th>
                        <th className="px-4 py-3 text-left font-semibold">Priority</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold">Created</th>
                        <th className="px-4 py-3 text-left font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {tickets
                        .filter((ticket) => {
                          const target = `${ticket.id} ${ticket.user} ${ticket.subject}`.toLowerCase();
                          return target.includes(ticketSearch.toLowerCase());
                        })
                        .map((ticket) => (
                          <tr key={ticket.id}>
                            <td className="px-4 py-3 text-sm text-gray-600">{ticket.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{ticket.user}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{ticket.subject}</td>
                            <td className={`px-4 py-3 text-sm ${priorityClass(ticket.priority)}`}>{ticket.priority}</td>
                            <td className={`px-4 py-3 text-sm ${statusClass(ticket.status)}`}>{ticket.status}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{ticket.created}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <button type="button" className="text-gray-700 hover:text-gray-900">{String.fromCharCode(9998)}</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Export Tickets</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Refresh</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'preferences' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Manage Frequently Asked Questions</h2>
                  <p className="text-xs text-gray-500">Create, Edit, And Organize FAQs For Users</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  <PlusIcon className="h-4 w-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Show FAQs On Homepage</p>
                    <p className="text-xs text-gray-500">Display Popular FAQs On The Main Landing Page</p>
                  </div>
                  <Toggle enabled={showFaqHome} onToggle={() => setShowFaqHome((v) => !v)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Auto-Suggest FAQs</p>
                    <p className="text-xs text-gray-500">Suggest Relevant FAQs Based On User Activity</p>
                  </div>
                  <Toggle enabled={autoSuggest} onToggle={() => setAutoSuggest((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Number Of FAQs Per Page</span>
                  <input defaultValue="30" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </label>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">FAQ Sorting Order</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="faq-sort" value="newest" checked={faqSort === 'newest'} onChange={(event) => setFaqSort(event.target.value)} />
                      Newest First
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="faq-sort" value="most-viewed" checked={faqSort === 'most-viewed'} onChange={(event) => setFaqSort(event.target.value)} />
                      Most Viewed
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="faq-sort" value="alphabetical" checked={faqSort === 'alphabetical'} onChange={(event) => setFaqSort(event.target.value)} />
                      Alphabetical
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Maximum Login Attempts</span>
                    <input defaultValue="90" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                    <p className="text-xs text-gray-400">Account Locks After Failed Attempts</p>
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Password Expiry (Days)</span>
                    <input defaultValue="7" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                    <p className="text-xs text-gray-400">Set To 0 To Disable Expiry</p>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Preferences</button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
