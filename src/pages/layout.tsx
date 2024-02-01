import Navigation from '@/components/Navigation/Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
