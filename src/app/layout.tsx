import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'GaoShouKe — Free Online Tools, Calculators & Guides',
  description: 'Free online tools, calculators, guides, and expert comparisons. Everything you need, no signup required.',
  metadataBase: new URL('https://gaoshouke.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://res.cloudinary.com/dhdbxilef/image/upload/q_auto/f_auto/v1775182794/GaoShouKe_asu96q.png',
    apple: 'https://res.cloudinary.com/dhdbxilef/image/upload/q_auto/f_auto/v1775182794/GaoShouKe_asu96q.png',
  },
  openGraph: {
    title: 'GaoShouKe — Free Online Tools, Calculators & Guides',
    description: '1000+ free online tools, calculators, guides, and comparisons. No signup required.',
    url: 'https://gaoshouke.com',
    siteName: 'GaoShouKe',
    images: [
      {
        url: 'https://res.cloudinary.com/dhdbxilef/image/upload/v1775182794/GaoShouKe_asu96q.png',
        width: 1200,
        height: 630,
        alt: 'GaoShouKe Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GaoShouKe — Free Online Tools & Guides',
    description: '1000+ free online tools, calculators, and guides. Fast and free.',
    images: ['https://res.cloudinary.com/dhdbxilef/image/upload/v1775182794/GaoShouKe_asu96q.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GaoShouKe',
    url: 'https://gaoshouke.com',
    description: 'Free online tools, calculators, and expert guides.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gaoshouke.com/tools?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GaoShouKe',
    url: 'https://gaoshouke.com',
    logo: 'https://res.cloudinary.com/dhdbxilef/image/upload/q_auto/f_auto/v1775182794/GaoShouKe_asu96q.png',
    sameAs: [
      'https://twitter.com/gaoshouke',
      'https://facebook.com/gaoshouke',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
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
