import type { Metadata } from 'next';
import Script from 'next/script';
import '@/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GaoShouKe — Free Online Tools, Calculators & Guides',
  description: 'Free online tools, calculators, guides, and expert comparisons. Everything you need, no signup required.',
  metadataBase: new URL('https://gaoshouke.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col pt-0">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y32P29KEZ9"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y32P29KEZ9');
        `}
        </Script>

        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5942162513113723"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
