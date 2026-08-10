import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Orakle — Dark Occult Divination',
  description: 'An atmospheric, high-contrast divination suite.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0A090D] text-[#E2E8F0] min-h-screen flex flex-col antialiased selection:bg-[#7C3AED] selection:text-white">
        {/* Persistent Navbar */}
        <Navbar />

        {/* Page Body Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}