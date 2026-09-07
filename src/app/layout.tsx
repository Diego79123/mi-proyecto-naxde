import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { SocialSidebar } from '@/components/layout/SocialSidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Naxde | Plataformas Digitales que Transforman Negocios',
  description: 'Desarrollo de software a medida, sitios web, e-commerce, inteligencia artificial, automatización y NeoCards. Naxde conecta diseño, tecnología y estrategia en Latinoamérica y Europa.',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FFavicon%20naxde.webp?alt=media&token=e0a7a283-64ec-4e60-865c-eb12370ead3b',
  },
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
          {children}
          <SocialSidebar />
          <FloatingActions />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
