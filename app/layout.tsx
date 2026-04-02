import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KadArtisan Admin Login",
  description: "Responsive Next.js Admin",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {/* ✅ Responsive wrapper */}
        <div className="flex min-h-screen flex-col">
          
          {/* ✅ Header / Navbar */}
          <header className="w-full bg-primary text-white">
            <div className="container flex items-center justify-between py-4">
              <h1 className="text-lg font-bold">KadArtisan</h1>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="hover:text-secondary">Home</a>
                <a href="/dashboard" className="hover:text-secondary">Dashboard</a>
              </nav>
              {/* Mobile menu button */}
              <button className="md:hidden p-2">☰</button>
            </div>
          </header>

          {/* ✅ Main content */}
          <main className="flex-1 container py-6">
            {children}
          </main>

          {/* ✅ Footer */}
          <footer className="w-full bg-secondary text-white mt-auto">
            <div className="container py-4 text-center text-sm">
              © {new Date().getFullYear()} KadArtisan. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
