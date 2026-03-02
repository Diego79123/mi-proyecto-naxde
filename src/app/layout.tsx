import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { CursorFollower } from '@/components/layout/CursorFollower';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Naxde | Plataformas Digitales que Transforman Negocios',
  description: 'Líderes en Colombia y Latinoamérica en desarrollo de software, tarjetas NFC y transformación digital.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-body antialiased bg-[#00001D]">
        <FirebaseClientProvider>
          <CursorFollower />
          {children}
          <SocialSidebar />
          <FloatingActions />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
