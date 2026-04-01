'use client';

import { useState } from 'react';
import {
  ArrowDownTrayIcon,
  ClockIcon,
  KeyIcon,
  LockClosedIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserGroupIcon,
  WifiIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

type SecurityTab = 'authentication' | 'access' | 'session' | 'firewall' | 'audit' | 'data';

type AdminRole = 'super admin' | 'admin' | 'viewer';

interface SecuritySection {
  key: SecurityTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: SecuritySection[] = [
  { key: 'authentication', label: 'Authentication', icon: LockClosedIcon },
  { key: 'access', label: 'Access Control', icon: KeyIcon },
  { key: 'session', label: 'Session Management', icon: UserGroupIcon },
  { key: 'firewall', label: 'Firewall & IP Rules', icon: WifiIcon },
  { key: 'audit', label: 'Audit Logs', icon: ClockIcon },
  { key: 'data', label: 'Data Protection', icon: ShieldCheckIcon },
];

interface AdminUser {
  name: string;
  email: string;
  role: AdminRole;
  lastActive: string;
  status: 'Active' | 'Suspended';
}

const admins: AdminUser[] = [
  {
    name: 'John Adeyemi',
    email: 'john@kadartisan.com',
    role: 'super admin',
    lastActive: '5 minutes ago',
    status: 'Active',
  },
  {
    name: 'John Adeyemi',
    email: 'john@kadartisan.com',
    role: 'admin',
    lastActive: '1 hour ago',
    status: 'Active',
  },
  {
    name: 'John Adeyemi',
    email: 'john@kadartisan.com',
    role: 'viewer',
    lastActive: 'Yesterday',
    status: 'Active',
  },
];

interface AuditItem {
  title: string;
  detail: string;
}

const auditItems: AuditItem[] = [
  { title: 'Login Successful', detail: 'John Adeyemi · IP: 192.168.1.100 · 5 minutes ago' },
  { title: 'Payment Settings Modified', detail: 'Amara Okafor · Changed Commission Rate To 12% · 1 hour ago' },
  { title: 'New Admin Added', detail: 'Grace Nwachukwu Added As Viewer · 2 hours ago' },
  { title: 'Failed Login Attempt', detail: 'IP: 203.0.113.45 · 3 Failed Attempts · 3 hours ago' },
  { title: 'Payout Settings Updated', detail: 'John Adeyemi · Changed Payout Schedule To Weekly · Yesterday' },
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

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<SecurityTab>('authentication');

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState('strong12');

  const [defaultRole, setDefaultRole] = useState('viewer (read-only)');

  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true);
  const [singleSessionEnabled, setSingleSessionEnabled] = useState(true);

  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(true);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);

  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [gdprEnabled, setGdprEnabled] = useState(true);
  const [backupStorage, setBackupStorage] = useState('local server');

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">Security Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Manage authentication, access control, and data protection for your platform</p>
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

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {activeTab === 'authentication' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Authentication Security</h2>
                <p className="text-xs text-gray-500">Configure Login Security And Password Policies</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-gray-500">Require 2FA For All Admin Accounts Using Authenticator App</p>
                  </div>
                  <Toggle enabled={twoFactorEnabled} onToggle={() => setTwoFactorEnabled((v) => !v)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Login Alerts</p>
                    <p className="text-xs text-gray-500">Send Email Notifications For New Login Attempts</p>
                  </div>
                  <Toggle enabled={loginAlertsEnabled} onToggle={() => setLoginAlertsEnabled((v) => !v)} />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Password Policy</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="password-policy"
                        value="strong8"
                        checked={passwordPolicy === 'strong8'}
                        onChange={(e) => setPasswordPolicy(e.target.value)}
                      />
                      Standard (8+ Chars)
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="password-policy"
                        value="strong12"
                        checked={passwordPolicy === 'strong12'}
                        onChange={(e) => setPasswordPolicy(e.target.value)}
                      />
                      Strong (12+ Chars, Numbers, Symbols)
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="password-policy"
                        value="strict16"
                        checked={passwordPolicy === 'strict16'}
                        onChange={(e) => setPasswordPolicy(e.target.value)}
                      />
                      Strict (16+ Chars, Numbers, Symbols, Uppercase)
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

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Account Lockout Duration (Minutes)</span>
                  <input defaultValue="30" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'access' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Access Control</h2>
                  <p className="text-xs text-gray-500">Manage Admin Roles And Permissions</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  <span className="text-base leading-none">+</span>
                  Add Admin
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Name/Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Role</th>
                      <th className="px-4 py-3 text-left font-semibold">Last Active</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {admins.map((admin, index) => (
                      <tr key={`${admin.email}-${index}`}>
                        <td className="px-4 py-3 align-top">
                          <p className="font-semibold text-gray-700">{admin.name}</p>
                          <p className="text-xs text-gray-400">{admin.email}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{admin.role === 'super admin' ? 'Super Admin' : admin.role === 'admin' ? 'Admin' : 'Viewer'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{admin.lastActive}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{admin.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <button type="button" className="text-red-500 hover:text-red-600" aria-label="Delete admin">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                            <button type="button" className="text-gray-600 hover:text-gray-700" aria-label="Edit admin">
                              <PencilSquareIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Dropdown
                id="default-role"
                label="Default Role For New Admins"
                value={defaultRole}
                options={['viewer (read-only)', 'admin (full access except security)', 'super admin (full access)']}
                onChange={setDefaultRole}
              />

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'session' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Session Management</h2>
                <p className="text-xs text-gray-500">Configure Session Timeouts And Active Sessions</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto-Logout After Inactivity</p>
                  </div>
                  <Toggle enabled={sessionTimeoutEnabled} onToggle={() => setSessionTimeoutEnabled((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Session Timeout Duration (Minutes)</span>
                  <input defaultValue="30" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                </label>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Single Session Mode</p>
                    <p className="text-xs text-gray-500">Allow Only One Active Session Per Admin Account</p>
                  </div>
                  <Toggle enabled={singleSessionEnabled} onToggle={() => setSingleSessionEnabled((v) => !v)} />
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">Active Sessions</h3>
                      <p className="text-xs text-gray-500">Currently Logged-In Admin Sessions</p>
                    </div>
                    <button type="button" className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-100">Terminate All</button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                      <div>
                        <p className="font-semibold text-gray-700">John Adeyemi</p>
                        <p className="text-xs text-gray-400">Chrome On Windows · IP: 192.168.1.100</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-green-600">Active now</span>
                        <button type="button" className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50">Terminate</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                      <div>
                        <p className="font-semibold text-gray-700">Adamu Adamu</p>
                        <p className="text-xs text-gray-400">Safari On Mac · IP: 192.168.1.105</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Last active: 15 mins ago</span>
                        <button type="button" className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50">Terminate</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'firewall' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Firewall & IP Rules</h2>
                <p className="text-xs text-gray-500">Restrict Admin Access To Trusted IP Addresses</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">IP Whitelist Enabled</p>
                    <p className="text-xs text-gray-500">Only Allow Admin Access From Whitelisted IP Addresses</p>
                  </div>
                  <Toggle enabled={ipWhitelistEnabled} onToggle={() => setIpWhitelistEnabled((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Whitelisted IP Addresses</span>
                  <textarea
                    defaultValue={'192.168.1.1\n10.0.0.0/24\n203.0.113.5'}
                    className="min-h-28 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-gray-400">One IP Or CIDR Range Per Line</p>
                </label>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Rate Limiting</p>
                    <p className="text-xs text-gray-500">Limit API And Login Requests Per IP</p>
                  </div>
                  <Toggle enabled={rateLimitEnabled} onToggle={() => setRateLimitEnabled((v) => !v)} />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Max Requests Per Minute</span>
                    <input defaultValue="90" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Block Duration (Minutes)</span>
                    <input defaultValue="7" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'audit' ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Audit Logs</h2>
                  <p className="text-xs text-gray-500">Track All Admin Activities And Security Events</p>
                </div>
                <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Export Logs
                </button>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                {auditItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-green-100 p-1.5 text-green-600">
                      <ShieldCheckIcon className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Clear Logs</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Refresh</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'data' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Data Protection</h2>
                <p className="text-xs text-gray-500">Configure Encryption, Backups, And Data Privacy</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Data Encryption At Rest</p>
                    <p className="text-xs text-gray-500">Encrypt Sensitive User Data In Database</p>
                  </div>
                  <Toggle enabled={encryptionEnabled} onToggle={() => setEncryptionEnabled((v) => !v)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">GDPR Compliance Mode</p>
                    <p className="text-xs text-gray-500">Enable GDPR Features (Data Export, Right To Be Forgotten)</p>
                  </div>
                  <Toggle enabled={gdprEnabled} onToggle={() => setGdprEnabled((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Data Retention Period (Days)</span>
                  <input defaultValue="90" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <p className="text-xs text-gray-400">Inactive User Data Will Be Anonymized After This Period</p>
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Backup Storage Location</span>
                  <input defaultValue="90" className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700" />
                  <p className="text-xs text-gray-400">Inactive User Data Will Be Anonymized After This Period</p>
                </label>

                <Dropdown
                  id="backup-storage"
                  label="Default Role For New Admins"
                  value={backupStorage}
                  options={['local server', 'aws s3', 'google cloud storage', 'azure blob storage']}
                  onChange={setBackupStorage}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">Reset</button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">Save Changes</button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
