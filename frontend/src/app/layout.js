// src/app/layout.js
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Regret Orakle',
  description: 'Your mystical portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}