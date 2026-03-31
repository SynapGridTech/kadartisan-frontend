'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface DropdownProps {
  id?: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  className = '',
  placeholder,
}: DropdownProps) {
  const selectedLabel =
    options.find((option) => option.toLowerCase() === value.toLowerCase()) ?? placeholder ?? value;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <Menu as="div" className="relative w-full">
        <MenuButton
          className="inline-flex h-11 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-left text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          id={id}
        >
          <span>{selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1)}</span>
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
        </MenuButton>

        <MenuItems className="absolute left-0 z-30 mt-2 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg focus:outline-none">
          {options.map((option) => {
            const isActive = option.toLowerCase() === value.toLowerCase();

            return (
              <MenuItem key={option}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => onChange(option)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } ${isActive ? 'font-semibold' : 'font-normal'}`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                )}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}
