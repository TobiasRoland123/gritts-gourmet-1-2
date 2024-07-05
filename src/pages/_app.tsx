import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />¨
      <SpeedInsights />
      <Analytics />
    </Layout>
  );
}
