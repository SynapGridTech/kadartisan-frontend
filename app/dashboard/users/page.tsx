'use client';

import { useMemo, useState } from 'react';
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type UserType = 'Artisan' | 'Customer';
type UserStatus = 'Active' | 'Inactive';

interface UserRow {
  id: number;
  createdDate: string;
  name: string;
  email: string;
  userType: UserType;
  phone: string;
  lastSeen: string;
  status: UserStatus;
  posts: number;
  followers: number;
  following: number;
  rating: number;
  reviews: number;
  organization: string;
  verificationType: string;
  whatsappNumber: string;
  address: string;
}

const users: UserRow[] = [
  {
    id: 1,
    createdDate: '2024-03-16',
    name: 'Ibrahim Sani',
    email: 'ibrahim.sani@email.com',
    userType: 'Artisan',
    phone: '0801 424 3999',
    lastSeen: '2026-02-15',
    status: 'Active',
    posts: 240,
    followers: 240,
    following: 240,
    rating: 4.3,
    reviews: 83,
    organization: 'Individual',
    verificationType: '2nd verification',
    whatsappNumber: '+234 801 234 5678',
    address: '2nd verification',
  },
  {
    id: 2,
    createdDate: '2024-10-19',
    name: 'Asiya Ibrahim',
    email: 'asiyaibrahim@email.com',
    userType: 'Customer',
    phone: '0703 237 8329',
    lastSeen: '2026-02-01',
    status: 'Active',
    posts: 65,
    followers: 74,
    following: 18,
    rating: 4.0,
    reviews: 21,
    organization: 'Retail Buyer',
    verificationType: '1st verification',
    whatsappNumber: '+234 703 237 8329',
    address: 'Barnawa, Kaduna',
  },
  {
    id: 3,
    createdDate: '2024-02-10',
    name: 'Yusuf Hassan',
    email: 'yusufhassan21@email.com',
    userType: 'Artisan',
    phone: '0703 237 8329',
    lastSeen: '2026-02-01',
    status: 'Inactive',
    posts: 130,
    followers: 112,
    following: 92,
    rating: 3.8,
    reviews: 34,
    organization: 'Workshop',
    verificationType: '1st verification',
    whatsappNumber: '+234 703 237 8329',
    address: 'Ungwan Rimi, Kaduna',
  },
];

const tabs = ['Posts', 'Comments', 'Reviews', 'Chat', 'Reports & Issue', 'Transactions'];

export default function AllUsersPage() {
  const [selectedUserType, setSelectedUserType] = useState<UserType | 'All'>('Artisan');
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const typeMatch = selectedUserType === 'All' || user.userType === selectedUserType;
      const queryMatch =
        query.length === 0 ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.includes(query);

      return typeMatch && queryMatch;
    });
  }, [query, selectedUserType]);

  return (
    <>
      <div className="space-y-6">
        <section className="flex flex-col gap-3 md:flex-row md:items-end">
          <Dropdown
            id="all-users-type"
            className="min-w-40"
            label="Typical user types"
            value={selectedUserType}
            options={['All', 'Artisan', 'Customer']}
            onChange={(value) => setSelectedUserType(value as UserType | 'All')}
          />

          <label className="relative w-full max-w-xl">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search user,artisan,revenue"
              className="h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-700 outline-none transition focus:ring-2 focus:ring-primary"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            ) : null}
          </label>
        </section>

        <section className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-green-500 text-left text-white">
                  <th className="px-4 py-3 font-medium">Create Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">User type</th>
                  <th className="px-4 py-3 font-medium">Phone No.</th>
                  <th className="px-4 py-3 font-medium">Last Seen</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="cursor-pointer border-b border-gray-100 bg-white hover:bg-green-50/50"
                  >
                    <td className="px-4 py-3">{user.createdDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-gray-300" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{user.userType}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3">{user.lastSeen}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'Active' ? 'bg-green-500' : 'bg-amber-400'
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="text-sm text-gray-700 transition hover:text-gray-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedUser ? (
        <div className="fixed inset-0 z-50">
          <button
            onClick={() => setSelectedUser(null)}
            className="absolute inset-0 bg-black/45"
            aria-label="Close user details"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <button className="rounded-md p-1 text-gray-600 hover:bg-gray-100">
                <EllipsisHorizontalIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 h-28 w-28 rounded-full bg-gray-200" />
              <div className="mb-2 flex justify-center gap-7 text-center">
                <div>
                  <p className="font-semibold text-gray-900">{selectedUser.posts}</p>
                  <p className="text-sm text-gray-500">Post</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedUser.followers}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedUser.following}</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
              <p className="inline-flex items-center gap-1 text-sm text-amber-500">
                {[1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="h-4 w-4" />
                ))}
                <span className="text-gray-500">{selectedUser.rating} ({selectedUser.reviews} reviews)</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Phone number</p>
                <p className="font-medium text-gray-900">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Email address</p>
                <p className="font-medium text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{selectedUser.status}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">User type</p>
                <p className="font-medium text-gray-900">{selectedUser.userType}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Last seen</p>
                <p className="font-medium text-gray-900">3:45 PM • yesterday</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Organization</p>
                <p className="font-medium text-gray-900">{selectedUser.organization}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Whatsapp number</p>
                <p className="font-medium text-gray-900">{selectedUser.whatsappNumber}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Verification type</p>
                <p className="font-medium text-gray-900">{selectedUser.verificationType}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{selectedUser.address}</p>
              </div>
            </div>

            <div className="mt-7 border-t pt-5">
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    className={`rounded px-2.5 py-1 ${
                      index === 0 ? 'bg-gray-100 font-medium text-gray-900' : 'hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <article className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                    <p className="text-xs text-gray-500">Posted 2 hours ago • Following</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  Custom Mahogany Dining Table Set. Handcrafted 8-seater dining table with matching
                  chairs. Features traditional Nigerian design elements with modern durability.
                </p>
              </article>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
