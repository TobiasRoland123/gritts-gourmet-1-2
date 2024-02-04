import Navigation from '@/components/Navigation/Navigation';

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
    </>
  );
}
