import Image from 'next/image';
import Logo from '../../../public/logo.svg';
import { Fade as Hamburger } from 'hamburger-react';

import React from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <>
      <nav className='flex justify-between items-center px-4 py-2'>
        <a
          aria-label={'logo'}
          href='./'
        >
          <Image
            src={Logo}
            alt={'logo'}
            width={50}
            height={50}
          />
        </a>

        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          color='#141414'
        />
      </nav>
    </>
  );
}
