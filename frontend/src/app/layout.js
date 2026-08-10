import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Orakle — Dark Occult Divination',
  description: 'An atmospheric, high-contrast divination suite.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0A090D] text-[#E2E8F0] min-h-screen flex flex-col antialiased selection:bg-[#8B0000] selection:text-white">
        {/* Persistent Navbar across all pages */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}