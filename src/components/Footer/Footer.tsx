import { CircleArrowUp, Facebook, Instagram } from 'lucide-react';
import FooterSvg from '../../public/graphics/footer.svg';
import Image from 'next/image';

export const Footer = () => {
  return (
    <>
      <footer className='w-full  h-80 mt-6 md:mt-10 grid grid-cols-1 relative'>
        <Image
          src={FooterSvg}
          height={300}
          width={1750}
          alt='footer'
          className='w-full h-full object-cover ob md:object-fill md:ovbject-center col-start-1 row-start-1
          '
        />

        <section className='col-start-1 w-full row-start-1 flex flex-col items-center pt-20 md:flex-row md:justify-between mx-auto max-w-screen-xl px-4 md:pb-4'>
          <div>
            <h2 className='font-amatic text-primaryCol pt-10 md:pt-32'>Følg Gritt</h2>
            <div className='gap-10 mt-6 hidden md:flex'>
              <a
                href='https://www.facebook.com/gritt.becker'
                aria-label="Gå til Gritt's facebook"
              >
                <Facebook
                  size={48}
                  color='#f3f8d8'
                  strokeWidth={1.25}
                />
              </a>
              <a
                href='https://www.instagram.com/mrsgrittbecker?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                aria-label="Gå til Gritt's Instagram"
              >
                <Instagram
                  size={48}
                  color='#f3f8d8'
                  strokeWidth={1.25}
                />
              </a>
            </div>
          </div>

          <div className='flex gap-10 mt-6 md:hidden'>
            <a
              href='https://www.facebook.com/gritt.becker'
              aria-label="Gå til Gritt's facebook"
            >
              <Facebook
                size={48}
                color='#f3f8d8'
                strokeWidth={1.25}
              />
            </a>
            <a
              href='https://www.instagram.com/mrsgrittbecker?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
              aria-label="Gå til Gritt's Instagram"
            >
              <Instagram
                size={48}
                color='#f3f8d8'
                strokeWidth={1.25}
              />
            </a>
          </div>

          <div className='mt-6 md:mt-10 flex flex-col'>
            <h2 className='font-roboto text-primaryCol pt-10 md:pt-0 hidden md:block text-5xl'>Til toppen</h2>
            <a
              href='#top'
              aria-label='Gå til toppen af siden'
              className='block md:mt-6 mx-auto'
            >
              <CircleArrowUp
                size={48}
                color='#f3f8d8'
                strokeWidth={1.25}
              />
            </a>
          </div>
        </section>
      </footer>
    </>
  );
};
export default Footer;
