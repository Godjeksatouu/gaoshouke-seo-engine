'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ slot, className }: { slot?: 'TOP' | 'MIDDLE' | 'BOTTOM'; className?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense Error', err);
    }
  }, [pathname]);

  return (
    <div className={`my-6 text-center ${className || ''}`} aria-hidden="true">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-5942162513113723"
        data-ad-slot={slot === 'TOP' ? 'top-slot-id' : slot === 'MIDDLE' ? 'mid-slot-id' : 'bot-slot-id'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
