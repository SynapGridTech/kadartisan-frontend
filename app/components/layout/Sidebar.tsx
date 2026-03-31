'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Squares2X2Icon,
  ChartBarIcon,
  BellIcon,
  UsersIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  BriefcaseIcon,
  StarIcon,
  CogIcon,
  ShieldCheckIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuSections = [
    {
      title: 'DASHBOARD',
      items: [
        { icon: Squares2X2Icon, label: 'Overview', href: '/dashboard' },
        { icon: ChartBarIcon, label: 'Analytics', href: '/dashboard/analytics' },
        { icon: BellIcon, label: 'Notifications', href: '/dashboard/notifications' },
      ],
    },
    {
      title: 'USER MANAGEMENT',
      items: [
        { icon: UsersIcon, label: 'All user', href: '/dashboard/users' },
        { icon: CheckBadgeIcon, label: 'Pending Verifications', href: '/dashboard/pending' },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { icon: ArrowPathIcon, label: 'Transactions', href: '/dashboard/transactions' },
        { icon: BriefcaseIcon, label: 'Jobs & Bookings', href: '/dashboard/jobs' },
      ],
    },
    {
      title: 'REVIEWS',
      items: [
        { icon: StarIcon, label: 'Reviews & Complaints', href: '/dashboard/reviews' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: CogIcon, label: 'General Settings', href: '/dashboard/settings' },
        { icon: ShieldCheckIcon, label: 'Payment Settings', href: '/dashboard/payment' },
        { icon: SparklesIcon, label: 'Security', href: '/dashboard/security' },
      ],
    },
    {
      title: 'SUPPORT CENTER',
      items: [
        { icon: QuestionMarkCircleIcon, label: 'FAQs', href: '/dashboard/faqs' },
        { icon: QuestionMarkCircleIcon, label: 'Admin help docs', href: '/dashboard/help' },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="p-6 border-b border-green-600">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold">KadArtisan</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-green-100 uppercase mb-3 px-2">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
