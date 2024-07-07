import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { Fade as Hamburger } from 'hamburger-react';
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  navItems?: Array<{ page: { name: string; path: string } }>;
}

function Navigation({ navItems }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  /* console.log(navItems); */

  return (
    <>
      <header
        className='max-w-screen overflow-hidden'
        id='top'
      >
        <nav className='flex justify-between sticky z-10 py-2 px-4 max-w-screen-xl mx-auto items-center'>
          <a
            aria-label={'link til forsiden'}
            href='./'
          >
            <Image
              src={Logo}
              alt={'logo'}
              width={80}
              height={80}
              className=' w-14 md:w-20'
            />
          </a>

          <div className='lg:hidden'>
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger>
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  color='#141414'
                  rounded
                  arial-label='Åben menu'
                />
              </SheetTrigger>
              <SheetContent className='bg-primaryCol md:w-1/3'>
                <ul className='flex  flex-col justify-between items-center gap-12 mt-16 md:mt-20'>
                  {navItems?.map((item, index) => (
                    <li
                      key={index}
                      className='first:mt-8 list-none'
                    >
                      <a
                        href={item.page.path}
                        className='px-4 py-2 text-gray-800'
                      >
                        {item.page.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>

          <ul className='hidden lg:flex'>
            {navItems?.map((item, index) => (
              <li
                key={index}
                className='list-none'
              >
                <a
                  href={item.page.path}
                  className='px-4 py-2 text-gray-800'
                >
                  {item.page.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
