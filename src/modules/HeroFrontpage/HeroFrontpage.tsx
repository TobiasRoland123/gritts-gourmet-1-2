import Image from 'next/image';
import { HeroFrontpageViewModel } from './HeroFrontpageViewModel';
import Button from '@/components/Button/Button';
import { HyphenatedText } from '@/components/HyphenatedText/HyphenatedText';

const HeroFrontpage = ({ headline, specialWord, description, button, image }: HeroFrontpageViewModel) => {
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
              className='col-start-1 row-start-1  md:hidden'
              src={image?.srcMobile}
              alt={'Hero billede' || image.alt}
              width={800}
            />
          ) : null}
          {image.srcDesktop ? (
            <Image
              className='hidden md:block col-start-1 row-start-1  md:col-start-4 md:col-end-9 md:row-start-1'
              src={image?.srcDesktop}
              alt={'Hero billede' || image.alt}
              width={800}
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

        <figure className='-mt-20 md:hidden'>
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
      <figure className=' w-full hidden md:block'>
        <svg
          width='100%'
          height='383'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clip-path='url(#clip0_73_1959)'>
            <path
              d='M-4 153.2L44.1944 134.05C92.3889 114.9 188.778 76.6 285.167 51.0406C381.556 25.7939 477.944 12.5061 574.333 63.8594C670.722 114.9 767.111 229.8 863.5 255.359C959.889 280.606 1056.28 217.294 1152.67 217.059C1249.06 217.294 1345.44 280.606 1441.83 280.841C1538.22 280.606 1634.61 217.294 1731 172.35C1827.39 127.406 1923.78 102.394 2020.17 127.641C2116.56 153.2 2212.94 229.8 2309.33 274.509C2405.72 318.906 2502.11 332.194 2598.5 287.25C2694.89 242.306 2791.28 140.694 2887.67 121.309C2984.06 102.394 3080.44 165.706 3176.83 191.5C3273.22 217.294 3369.61 204.006 3466 204.241C3562.39 204.006 3658.78 217.294 3755.17 217.059C3851.56 217.294 3947.94 204.006 4044.33 172.35C4140.72 140.694 4237.11 89.1061 4333.5 102.159C4429.89 114.9 4526.28 191.5 4622.67 204.241C4719.06 217.294 4815.44 165.706 4911.83 165.941C5008.22 165.706 5104.61 217.294 5201 229.8C5297.39 242.306 5393.78 217.294 5490.17 229.8C5586.56 242.306 5682.94 293.894 5779.33 319.141C5875.72 344.7 5972.11 344.7 6068.5 344.7C6164.89 344.7 6261.28 344.7 6357.67 331.959C6454.06 318.906 6550.44 293.894 6646.83 242.541C6743.22 191.5 6839.61 114.9 6887.81 76.6L6936 38.3V383H6887.81C6839.61 383 6743.22 383 6646.83 383C6550.44 383 6454.06 383 6357.67 383C6261.28 383 6164.89 383 6068.5 383C5972.11 383 5875.72 383 5779.33 383C5682.94 383 5586.56 383 5490.17 383C5393.78 383 5297.39 383 5201 383C5104.61 383 5008.22 383 4911.83 383C4815.44 383 4719.06 383 4622.67 383C4526.28 383 4429.89 383 4333.5 383C4237.11 383 4140.72 383 4044.33 383C3947.94 383 3851.56 383 3755.17 383C3658.78 383 3562.39 383 3466 383C3369.61 383 3273.22 383 3176.83 383C3080.44 383 2984.06 383 2887.67 383C2791.28 383 2694.89 383 2598.5 383C2502.11 383 2405.72 383 2309.33 383C2212.94 383 2116.56 383 2020.17 383C1923.78 383 1827.39 383 1731 383C1634.61 383 1538.22 383 1441.83 383C1345.44 383 1249.06 383 1152.67 383C1056.28 383 959.889 383 863.5 383C767.111 383 670.722 383 574.333 383C477.944 383 381.556 383 285.167 383C188.778 383 92.3889 383 44.1944 383H-4V153.2Z'
              fill='url(#paint0_linear_73_1959)'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_73_1959'
              x1='-4'
              y1='383'
              x2='-4'
              y2='28.7247'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#99565E' />
              <stop
                offset='1'
                stop-color='#F3F8D8'
              />
            </linearGradient>
            <clipPath id='clip0_73_1959'>
              <rect
                width='1735'
                height='383'
                fill='white'
                transform='translate(-4)'
              />
            </clipPath>
          </defs>
        </svg>
      </figure>
    </>
  );
};

export default HeroFrontpage;
