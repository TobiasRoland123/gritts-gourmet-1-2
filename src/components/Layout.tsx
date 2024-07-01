import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: "Gritt's Gourmet | Forside",
    template: "%s | Gritt's Gourmet",
  },
  description:
    "Gritt's Gourmet er en madblog med fokus på lækre opskrifter og madoplevelser. Find inspiration til din næste ret her!",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation
        navItems={[{ page: { name: 'opskrifter', path: '/opskrifter' } }, { page: { name: 'Om Gritt', path: '/om-gritt' } }]}
      />
      <main>{children}</main>

      <Footer />
    </>
  );
}
