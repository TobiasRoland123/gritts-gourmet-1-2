import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import React from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <HeroFrontpage {...HeroFrontpageMock} />
    </>
  );
}
