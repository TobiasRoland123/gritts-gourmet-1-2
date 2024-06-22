import { CircleArrowUp, Facebook, Instagram } from 'lucide-react';
import FooterSvg from '../../public/graphics/footer.svg';
import Image from 'next/image';

export const Footer = () => {
  return (
    <>
      <div className='w-full  h-80 mt-6 md:mt-10 grid grid-cols-1 relative'>
        <Image
          src={FooterSvg}
          height={300}
          width={1750}
          alt='footer'
          className='w-full h-full object-cover ob md:object-fill md:ovbject-center col-start-1 row-start-1
          '
        />

        <section className='col-start-1 row-start-1 flex flex-col items-center pt-20'>
          <h2 className='font-amatic text-primaryCol pt-10'>Følg Gritt</h2>

          <div className='flex gap-10 mt-6'>
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

          <a
            href='#top'
            aria-label='Gå til toppen af siden'
          >
            <CircleArrowUp
              size={48}
              color='#f3f8d8'
              strokeWidth={1.25}
            />
          </a>
        </section>
      </div>
    </>
  );
};
export default Footer;
