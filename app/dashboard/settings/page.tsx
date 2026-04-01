'use client';

import { useState } from 'react';
import {
  BellIcon,
  BuildingStorefrontIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  LanguageIcon,
  ShieldCheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type SettingsSection =
  | 'platform'
  | 'business'
  | 'notifications'
  | 'security'
  | 'localization'
  | 'data';

const sections: Array<{ key: SettingsSection; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: 'platform', label: 'Platform Settings', icon: GlobeAltIcon },
  { key: 'business', label: 'Business Info', icon: BuildingStorefrontIcon },
  { key: 'notifications', label: 'Notifications', icon: BellIcon },
  { key: 'security', label: 'Security', icon: ShieldCheckIcon },
  { key: 'localization', label: 'Localization', icon: LanguageIcon },
  { key: 'data', label: 'Data Management', icon: CircleStackIcon },
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

export default function GeneralSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('platform');

  const [allowRegistration, setAllowRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(true);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true);

  const [autoBackup, setAutoBackup] = useState(true);
  const [anonymousUsage, setAnonymousUsage] = useState(true);

  const [commissionType, setCommissionType] = useState('percentage of transaction');
  const [defaultLanguage, setDefaultLanguage] = useState('english');
  const [currency, setCurrency] = useState('nigerian naira (n)');
  const [timeZone, setTimeZone] = useState('west africa time (utc+1)');

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">General Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Configure your platform preferences and system behavior</p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[290px_1fr]">
        <aside className="self-start rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <ul className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.key;

              return (
                <li key={section.key}>
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.key)}
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

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {activeSection === 'platform' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Platform Settings</h2>
                <p className="text-xs text-gray-500">Configure Core Platform Behavior And Features</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Enable Registration</p>
                    <p className="text-xs text-gray-500">Allow New Artisans And Customers To Join The Platform</p>
                  </div>
                  <Toggle enabled={allowRegistration} onToggle={() => setAllowRegistration((v) => !v)} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Require Email Verification</p>
                    <p className="text-xs text-gray-500">New Users Must Verify Their Email Address Before Accessing Platform</p>
                  </div>
                  <Toggle enabled={requireEmailVerification} onToggle={() => setRequireEmailVerification((v) => !v)} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Put The Platform In Maintenance Mode (Only Admins Can Access)</p>
                  </div>
                  <Toggle enabled={maintenanceMode} onToggle={() => setMaintenanceMode((v) => !v)} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Commission Rate (%)</span>
                  <input
                    defaultValue="10"
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
                <Dropdown
                  id="commission-type"
                  label="Commission Type"
                  value={commissionType}
                  options={['percentage of transaction', 'flat fee per order']}
                  onChange={setCommissionType}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeSection === 'business' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
                <p className="text-xs text-gray-500">Manage Your Company Profile And Contact Details</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-600 text-5xl font-black text-green-600">K</div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-300">KadArtisan</p>
                    <button type="button" className="mt-1 rounded-full border border-sky-300 bg-sky-50 px-4 py-1 text-xs font-medium text-sky-600">Upload Image</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <input defaultValue="KadArtisan" className="h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <input defaultValue="Connecting Artisans With Opportunities" className="h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <input defaultValue="support@kadartisan.com" className="h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <input defaultValue="+234 800 123 4567" className="h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <input defaultValue="123 Ahmadu Bello Way, Kaduna, Nigeria" className="h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeSection === 'notifications' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
                <p className="text-xs text-gray-500">Configure Which Notifications Are Sent To Users And Admins</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email Notifications</p>
                    <p className="text-xs text-gray-500">Send Push Notifications To Mobile Devices</p>
                  </div>
                  <Toggle enabled={emailNotifications} onToggle={() => setEmailNotifications((v) => !v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Push Notifications</p>
                    <p className="text-xs text-gray-500">Send Push Notifications To Mobile Devices</p>
                  </div>
                  <Toggle enabled={pushNotifications} onToggle={() => setPushNotifications((v) => !v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Send SMS Alerts For Critical Updates</p>
                  </div>
                  <Toggle enabled={smsNotifications} onToggle={() => setSmsNotifications((v) => !v)} />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Admin Alert Email</span>
                  <input
                    defaultValue="admin@kadartisan.com"
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-gray-400">Receive Critical Platform Alerts</p>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeSection === 'security' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
                <p className="text-xs text-gray-500">Configure Security Policies And Access Controls</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-gray-500">Require 2FA For All Admin Accounts</p>
                  </div>
                  <Toggle enabled={twoFactorAuth} onToggle={() => setTwoFactorAuth((v) => !v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto-Logout After Inactivity</p>
                  </div>
                  <Toggle enabled={sessionTimeoutEnabled} onToggle={() => setSessionTimeoutEnabled((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Session Timeout Duration (Minutes)</span>
                  <input defaultValue="30" className="h-10 w-44 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </label>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Password Policy</p>
                  <label className="flex items-center gap-2 text-sm text-gray-600"><input type="radio" name="policy" defaultChecked /> Strong (8+ Chars)</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600"><input type="radio" name="policy" /> Strong (12+ Chars, Numbers, Symbols)</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600"><input type="radio" name="policy" /> Strict (16+ Chars, Numbers, Symbols, Uppercase)</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeSection === 'localization' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Localization</h2>
                <p className="text-xs text-gray-500">Configure Language, Currency, And Regional Settings</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <Dropdown
                  id="default-language"
                  className="max-w-xs"
                  label="Default Language"
                  value={defaultLanguage}
                  options={['english', 'hausa', 'yoruba', 'igbo', 'nigeria pidgin']}
                  onChange={setDefaultLanguage}
                />

                <Dropdown
                  id="currency"
                  className="max-w-xs"
                  label="Currency"
                  value={currency}
                  options={['nigerian naira (n)', 'us dollar ($)']}
                  onChange={setCurrency}
                />

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Session Timeout Duration (Minutes)</span>
                  <input defaultValue="30" className="h-10 w-44 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </label>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Password Policy</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <label className="flex items-center gap-2"><input type="radio" name="date-format" defaultChecked /> DD/MM/YYYY</label>
                    <label className="flex items-center gap-2"><input type="radio" name="date-format" /> MM/DD/YYYY</label>
                    <label className="flex items-center gap-2"><input type="radio" name="date-format" /> YYYY-MM-DD</label>
                  </div>
                </div>

                <Dropdown
                  id="time-zone"
                  label="Time Zone"
                  value={timeZone}
                  options={['west africa time (utc+1)', 'greenwich mean time (utc+0)']}
                  onChange={setTimeZone}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeSection === 'data' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Data Management</h2>
                <p className="text-xs text-gray-500">Manage Backups, Exports, And Data Retention</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Auto Backup</p>
                    <p className="text-xs text-gray-500">Automatically Backup Database Daily</p>
                  </div>
                  <Toggle enabled={autoBackup} onToggle={() => setAutoBackup((v) => !v)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Automatically Backup Database Daily</p>
                    <p className="text-xs text-gray-500">Collect Anonymous Usage Data For Platform Improvement</p>
                  </div>
                  <Toggle enabled={anonymousUsage} onToggle={() => setAnonymousUsage((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Data Retention Period (Days)</span>
                  <input defaultValue="365" className="h-10 w-44 rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <p className="text-xs text-gray-400">Logs And Inactive User Data Will Be Archived After This Period</p>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <Cog6ToothIcon className="h-4 w-4" />
                  Export Data
                </button>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-6 py-2 text-sm font-semibold text-red-500 hover:bg-red-50">
                  <TrashIcon className="h-4 w-4" />
                  Clear Cache
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
