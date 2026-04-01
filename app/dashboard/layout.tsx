import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="pt-24 px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
