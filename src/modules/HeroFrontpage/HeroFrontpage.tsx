import Image from 'next/image';
import { HeroFrontpageViewModel } from './HeroFrontpageViewModel';
import Button from '@/components/Button/Button';
import { HyphenatedText } from '@/components/HyphenatedText/HyphenatedText';
import { cn } from '@/lib/utils';
import heroWave from '../../public/graphics/heroWave.svg';

const Hero = ({ headline, specialWord, description, button, image, notOnFrontpage }: HeroFrontpageViewModel) => {
  const renderHeader = () => {
    if (!headline) return null;

    const words = headline.split(' ');
    const specielWords = specialWord.split(' ');

    return (
      <h1 className='text-center md:text-start'>
        {words.map((word, index) => (
          <span
            key={index}
            className={specialWord.includes(word) ? 'text-accentCol font-amatic ' : ''}
          >
            <HyphenatedText text={word} />{' '}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <>
      <section className='md:max-w-screen-xl md:mx-auto'>
        <div className='grid md:grid-cols-8 items-center '>
          {image.srcMobile ? (
            <Image
              className='col-start-1 row-start-1 object-cover md:hidden'
              src={`https:${image.srcMobile}`}
              alt={'Hero billede' || image.alt}
              width={760}
              height={800}
              quality={50}
              priority={true}
            />
          ) : null}
          {image.srcDesktop ? (
            <Image
              className='hidden md:block col-start-1 row-start-1  md:col-start-4 md:col-end-9 md:row-start-1'
              src={`https:${image.srcDesktop}`}
              alt={'Hero billede' || image.alt}
              width={800}
              height={800}
              quality={90}
              priority={true}
            />
          ) : null}

          <div className='container -mt-20 sm:-mt-52 md:col-start-1 md:col-end-5 md:row-start-1 md:mt-0 md:bg-primaryCol md:h-fit md:py-6 pr-6  '>
            {headline ? <>{renderHeader()}</> : null}
            {description ? <p className='mt-4'>{description}</p> : null}
            {button ? (
              <Button
                text={button.text}
                href={button.href}
                className='w-full md:w-auto'
              >
                {button.children}
              </Button>
            ) : null}
          </div>
        </div>

        <figure className={cn(notOnFrontpage && 'hidden', 'mt-10 md:hidden')}>
          <Image
            src={heroWave}
            alt='bølge illustration'
            width={800}
            height={800}
            quality={90}
            priority={true}
            className=' h-40 w-full object-cover'
          />
        </figure>
      </section>
    </>
  );
};

export default Hero;
