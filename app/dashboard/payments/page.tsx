'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';
import Dropdown from '@/app/components/ui/Dropdown';

interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
  statusColor: string;
}

const paymentGateways: PaymentGateway[] = [
  {
    id: 'paystack',
    name: 'Paystack',
    description: 'Leading Nigerian Payment Gateway',
    icon: '💳',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    description: 'Pan-African Payment Solutions',
    icon: '🌍',
    status: 'Inactive',
    statusColor: 'bg-gray-100 text-gray-600',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'International Payments',
    icon: '🔵',
    status: 'Test Mode',
    statusColor: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'monnify',
    name: 'Monnify',
    description: 'Bank Transfer Solutions',
    icon: '🏦',
    status: 'Inactive',
    statusColor: 'bg-gray-100 text-gray-600',
  },
];

type PaymentTab = 'gateways' | 'fee-structure' | 'payout' | 'currency' | 'refund' | 'webhooks';

interface PaymentSection {
  key: PaymentTab;
  label: string;
  icon: React.ComponentType<{ className: string }>;
}

const sections: PaymentSection[] = [
  { key: 'gateways', label: 'Payment Gateways', icon: CreditCardIcon },
  { key: 'fee-structure', label: 'Fee Structure', icon: DocumentTextIcon },
  { key: 'payout', label: 'Payout Settings', icon: WalletIcon },
  { key: 'currency', label: 'Currency & Limits', icon: CurrencyDollarIcon },
  { key: 'refund', label: 'Refund Policy', icon: CheckCircleIcon },
  { key: 'webhooks', label: 'Webhooks', icon: GlobeAltIcon },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? 'bg-green-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function PaymentSettingsPage() {
  const [activeTab, setActiveTab] = useState<PaymentTab>('gateways');

  // Payment Gateways state
  const [apiKey, setApiKey] = useState('PK_live_abc123def456...');
  const [secretKey, setSecretKey] = useState('••••••••••');
  const [merchantEmail, setMerchantEmail] = useState('merchant@kadartisan.com');
  const [testMode, setTestMode] = useState(false);

  // Fee Structure state
  const [commissionType, setCommissionType] = useState('percentage of transaction');
  const [minimumFee, setMinimumFee] = useState('50');
  const [withdrawalFeeEnabled, setWithdrawalFeeEnabled] = useState(true);

  // Payout Settings state
  const [payoutSchedule, setPayoutSchedule] = useState('weekly');
  const [minimumThreshold, setMinimumThreshold] = useState('5000');
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(true);
  const [holdEscrowEnabled, setHoldEscrowEnabled] = useState(true);

  // Currency & Limits state
  const [baseCurrency, setBaseCurrency] = useState('nigerian naira (n)');
  const [nonChecked, setNonChecked] = useState(true);
  const [usdChecked, setUsdChecked] = useState(false);
  const [gbpChecked, setGbpChecked] = useState(false);
  const [minTransaction, setMinTransaction] = useState('100');
  const [maxTransaction, setMaxTransaction] = useState('5000000');

  // Refund Policy state
  const [autoApproveEnabled, setAutoApproveEnabled] = useState(true);
  const [refundFee, setRefundFee] = useState('0');

  // Webhooks state
  const [successWebhook, setSuccessWebhook] = useState('https://api.kadartisan.com/webhooks/payment/success');
  const [failedWebhook, setFailedWebhook] = useState('https://api.kadartisan.com/webhooks/payment/failed');
  const [completedWebhook, setCompletedWebhook] = useState('https://api.kadartisan.com/webhooks/payout/completed');
  const [webhookSecret, setWebhookSecret] = useState('••••••••••');

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">Payment Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Configure payment gateways, fees, and financial rules for your platform</p>
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
          {activeTab === 'gateways' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Platform Settings</h2>
                <p className="text-xs text-gray-500">Configure Core Platform Behavior And Features</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {paymentGateways.map((gateway) => (
                  <div key={gateway.id} className="rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{gateway.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-800">{gateway.name}</p>
                          <p className="text-xs text-gray-500">{gateway.description}</p>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${gateway.statusColor}`}>
                      {gateway.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">API Key</span>
                  <input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Secret Key</span>
                  <input
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Merchant Email</span>
                  <input
                    value={merchantEmail}
                    onChange={(e) => setMerchantEmail(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Test Mode</p>
                    <p className="text-xs text-gray-500">Use Test Keys For Sandbox Environment</p>
                  </div>
                  <Toggle enabled={testMode} onToggle={() => setTestMode((v) => !v)} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Reset
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Gateway Settings
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'fee-structure' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Fee Structure</h2>
                <p className="text-xs text-gray-500">Configure Platform Fees And Commissions</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Dropdown
                    id="commission-type"
                    label="Commission Type"
                    value={commissionType}
                    options={['percentage of transaction', 'flat fee per order']}
                    onChange={setCommissionType}
                  />
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Commission Rate (%)</span>
                    <input
                      defaultValue="10"
                      className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Minimum Commission Fee</span>
                  <input
                    value={minimumFee}
                    onChange={(e) => setMinimumFee(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-gray-400">Minimum Fee Charged Per Transaction (If Percentage Is Lower)</p>
                </label>

                <div className="pt-3">
                  <p className="mb-3 text-sm font-semibold text-gray-700">Artisan Subscription Fees</p>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Plan</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Monthly Fee</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Features</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Basic Plan</td>
                          <td className="px-4 py-2 text-gray-700">₦0</td>
                          <td className="px-4 py-2 text-xs text-gray-500">Limited</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Pro Plan</td>
                          <td className="px-4 py-2 text-gray-700">₦5000</td>
                          <td className="px-4 py-2 text-xs text-gray-500">Full Access</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Pro Plan</td>
                          <td className="px-4 py-2 text-gray-700">₦15000</td>
                          <td className="px-4 py-2 text-xs text-gray-500">Premium</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Withdrawal Fee</p>
                    <p className="text-xs text-gray-500">Charge Artisans For Withdrawal Requests</p>
                  </div>
                  <Toggle enabled={withdrawalFeeEnabled} onToggle={() => setWithdrawalFeeEnabled((v) => !v)} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Reset
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Fee Structure
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'payout' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Payout Settings</h2>
                <p className="text-xs text-gray-500">Configure How And When Artisans Receive Payments</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-700">Payout Schedule</p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="payout-schedule"
                        value="instant"
                        checked={payoutSchedule === 'instant'}
                        onChange={(e) => setPayoutSchedule(e.target.value)}
                      />
                      Instant
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="payout-schedule"
                        value="weekly"
                        checked={payoutSchedule === 'weekly'}
                        onChange={(e) => setPayoutSchedule(e.target.value)}
                      />
                      Weekly
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="payout-schedule"
                        value="biweekly"
                        checked={payoutSchedule === 'biweekly'}
                        onChange={(e) => setPayoutSchedule(e.target.value)}
                      />
                      Bi-Weekly
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="payout-schedule"
                        value="monthly"
                        checked={payoutSchedule === 'monthly'}
                        onChange={(e) => setPayoutSchedule(e.target.value)}
                      />
                      Monthly
                    </label>
                  </div>
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Minimum Payout Threshold</span>
                  <input
                    value={minimumThreshold}
                    onChange={(e) => setMinimumThreshold(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-gray-400">Artisans Can Request Payout Only When Balance Exceeds This Amount</p>
                </label>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Auto-Payout</p>
                    <p className="text-xs text-gray-500">Automatically Process Payouts According To Schedule</p>
                  </div>
                  <Toggle enabled={autoPayoutEnabled} onToggle={() => setAutoPayoutEnabled((v) => !v)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Hold Escrow For Disputes</p>
                    <p className="text-xs text-gray-500">Hold Payments In Escrow Until Job Completion Confirmation</p>
                  </div>
                  <Toggle enabled={holdEscrowEnabled} onToggle={() => setHoldEscrowEnabled((v) => !v)} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Reset
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Payout Settings
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'currency' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Currency & Transaction Limits</h2>
                <p className="text-xs text-gray-500">Configure Accepted Currencies And Transaction Limits</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <Dropdown
                  id="base-currency"
                  label="Base Currency"
                  value={baseCurrency}
                  options={['nigerian naira (n)', 'us dollar ($)', 'ghanaian cedi (₵)', 'south african rand (r)']}
                  onChange={setBaseCurrency}
                />

                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-700">Accepted Currencies</p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={nonChecked}
                        onChange={(e) => setNonChecked(e.target.checked)}
                      />
                      NON
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" checked={usdChecked} onChange={(e) => setUsdChecked(e.target.checked)} />
                      USD
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" checked={gbpChecked} onChange={(e) => setGbpChecked(e.target.checked)} />
                      GBP
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Minimum Transaction Amount</span>
                    <input
                      value={minTransaction}
                      onChange={(e) => setMinTransaction(e.target.value)}
                      className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <p className="text-xs text-gray-400">Nigerian Naira (₦)</p>
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-gray-700">Maximum Transaction Amount</span>
                    <input
                      value={maxTransaction}
                      onChange={(e) => setMaxTransaction(e.target.value)}
                      className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <p className="text-xs text-gray-400">Nigerian Naira (₦)</p>
                  </label>
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Maximum Daily Transaction Limit (Per User)</span>
                  <input
                    defaultValue="5000000"
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Reset
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Currency Settings
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'refund' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Refund Policy</h2>
                <p className="text-xs text-gray-500">Configure Refund Rules And Timeframes</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Auto-Approve Refunds</p>
                    <p className="text-xs text-gray-500">Automatically Approve Refunds For Eligible Transactions</p>
                  </div>
                  <Toggle enabled={autoApproveEnabled} onToggle={() => setAutoApproveEnabled((v) => !v)} />
                </div>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Refund Processing Fee</span>
                  <input
                    value={refundFee}
                    onChange={(e) => setRefundFee(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <p className="text-xs text-gray-400">Amount Deducted From Refund (₦)</p>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Reset
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Refund Policy
                </button>
              </div>
            </div>
          ) : null}

          {activeTab === 'webhooks' ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Webhook Configuration</h2>
                <p className="text-xs text-gray-500">Configure Endpoints For Payment Events</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-4">
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Payment Success Webhook URL</span>
                  <input
                    value={successWebhook}
                    onChange={(e) => setSuccessWebhook(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Payment Failed Webhook URL</span>
                  <input
                    value={failedWebhook}
                    onChange={(e) => setFailedWebhook(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Payout Completed Webhook URL</span>
                  <input
                    value={completedWebhook}
                    onChange={(e) => setCompletedWebhook(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold text-gray-700">Webhook Secret (For Signature Verification)</span>
                  <input
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button type="button" className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Test Webhook
                </button>
                <button type="button" className="rounded-xl bg-green-700 px-6 py-2 text-sm font-semibold text-white hover:bg-green-800">
                  Save Webhook Settings
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
