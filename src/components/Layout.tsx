import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

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
