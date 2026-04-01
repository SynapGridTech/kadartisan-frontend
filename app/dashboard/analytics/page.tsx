import TotalUserChart from '@/app/components/charts/TotalUserChart';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const analyticsRows = [
    {
        name: 'Ibrahim Sani',
        email: 'ibrahimsani@email.com',
        skillCategory: 'Customer',
        verificationStatus: '1st Verification',
        joinedDate: 'Dec 18, 2024',
        status: 'Active',
        project: 5,
    },
    {
        name: 'Maya Patel',
        email: 'mayapatel@email.com',
        skillCategory: 'Customer',
        verificationStatus: '2nd Verification',
        joinedDate: 'Dec 18, 2024',
        status: 'Active',
        project: 5,
    },
    {
        name: 'Liam Johnson',
        email: 'liamjohnson@email.com',
        skillCategory: 'Artisan',
        verificationStatus: '1st Verification',
        joinedDate: 'Dec 15, 2024',
        status: 'Active',
        project: 20,
    },
    {
        name: 'Ravi Sharma',
        email: 'ravisharma@email.com',
        skillCategory: 'Artisan',
        verificationStatus: '1st Verification',
        joinedDate: 'Dec 20, 2024',
        status: 'Inactive',
        project: 15,
    },
    {
        name: 'Olivia Brown',
        email: 'oliviabrown@email.com',
        skillCategory: 'Customer',
        verificationStatus: '1st Verification',
        joinedDate: 'Dec 22, 2024',
        status: 'Active',
        project: 3,
    },
    {
        name: 'James Smith',
        email: 'jamessmith@email.com',
        skillCategory: 'Artisan',
        verificationStatus: '2nd Verification',
        joinedDate: 'Dec 25, 2024',
        status: 'Active',
        project: 25,
    },
    {
        name: 'Ethan Lee',
        email: 'ethanlee@email.com',
        skillCategory: 'Artisan',
        verificationStatus: '1st Verification',
        joinedDate: 'Dec 30, 2024',
        status: 'Active',
        project: 30,
    },
    {
        name: 'Fatima Khan',
        email: 'fatimakhan@email.com',
        skillCategory: 'Customer',
        verificationStatus: '2nd Verification',
        joinedDate: 'Dec 28, 2024',
        status: 'Inactive',
        project: 2,
    },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-end">
                {/* //TODO: some header text to be place here */}
                {/* <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-600 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening now</p>
                </div> */}
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">Month</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                </div>
            </div>
            <TotalUserChart className="w-full" />

            <section className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-green-500 text-left text-white">
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Skill category</th>
                                <th className="px-4 py-3 font-medium">Verification status</th>
                                <th className="px-4 py-3 font-medium">Joined date</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Project</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsRows.map((row) => (
                                <tr key={`${row.email}-${row.joinedDate}`} className="border-b border-gray-100 last:border-0">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900">{row.name}</p>
                                        <p className="text-xs text-gray-500">{row.email}</p>
                                    </td>
                                    <td className="px-4 py-3">{row.skillCategory}</td>
                                    <td className="px-4 py-3">{row.verificationStatus}</td>
                                    <td className="px-4 py-3">{row.joinedDate}</td>
                                    <td className="px-4 py-3">{row.status}</td>
                                    <td className="px-4 py-3">{row.project}</td>
                                    <td className="px-4 py-3">
                                        <button className="rounded-md bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors">
                                            Actions
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
