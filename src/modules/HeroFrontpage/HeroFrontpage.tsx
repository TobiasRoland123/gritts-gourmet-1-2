import Image from 'next/image';
import { HeroFrontpageViewModel } from './HeroFrontpageViewModel';
import Button from '@/components/Button/Button';
import { HyphenatedText } from '@/components/HyphenatedText/HyphenatedText';
import { cn } from '@/lib/utils';

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
            {' '}
            <HyphenatedText text={word} />
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
              className='col-start-1 row-start-1  md:hidden'
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

          <div className='container -mt-20 md:col-start-1 md:col-end-5 md:row-start-1 md:mt-0 md:bg-primaryCol md:h-fit md:py-6 pr-6  '>
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

        <figure className={cn(notOnFrontpage && 'hidden', '-mt-20 md:hidden')}>
          <svg
            fill='none'
            width='100%'
            height='100%'
            viewBox='0 0 320 363'
          >
            <path
              fill='url(#a)'
              d='m-895 127.541 40.236-19.622c40.236-19.621 120.708-58.865 201.181-85.053C-573.111-3.004-492.639-16.619-412.167 36c80.473 52.297 160.945 170.027 241.417 196.216 80.472 25.868 160.944-39.003 241.417-39.243 80.472.24 160.944 65.111 241.416 65.352 80.473-.241 160.945-65.112 241.417-111.163 80.472-46.05 160.944-71.679 241.417-45.81 80.472 26.189 160.944 104.675 241.413 150.486 80.48 45.49 160.95 59.105 241.42 13.054 80.47-46.051 160.94-150.165 241.42-170.027 80.47-19.382 160.94 45.49 241.41 71.919 80.48 26.429 160.95 12.814 241.42 13.054 80.47-.24 160.94 13.375 241.42 13.135 80.47.24 160.94-13.375 241.41-45.811 80.48-32.435 160.95-85.294 241.42-71.919 80.47 13.055 160.94 91.541 241.42 104.595 80.47 13.375 160.94-39.483 241.41-39.243 80.48-.24 160.95 52.618 241.42 65.432s160.94-12.814 241.42 0c80.47 12.814 160.94 65.672 241.41 91.541 80.48 26.189 160.95 26.189 241.42 26.189s160.94 0 241.42-13.055c80.47-13.374 160.94-39.003 241.41-91.62 80.48-52.298 160.95-130.784 201.18-170.028L4899 9.811V363H-895V127.541Z'
            />
            <defs>
              <linearGradient
                id='a'
                x1='-895'
                x2='-895'
                y1='363'
                y2='0'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#99565E' />
                <stop
                  offset='1'
                  stopColor='#F3F8D8'
                />
              </linearGradient>
            </defs>
          </svg>
        </figure>
      </section>
    </>
  );
};

export default Hero;
