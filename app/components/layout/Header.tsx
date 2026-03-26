'use client';

import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search user,artisan review..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* User Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin user</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
