import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gritt's Gourmet | Opskrifter og madlavningstips",
  description: 'Gritt’s Gourmet er en madblog med opskrifter og madlavningstips. Find inspiration til din næste ret her',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation
        navItems={[
          { page: { name: 'opskrifter', path: '../pages/opskrifter' } },
          { page: { name: 'Om Gritt', path: '../pages/om-gritt' } },
        ]}
      />
      <main>{children}</main>

      <Footer />
    </>
  );
}
