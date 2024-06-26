import * as React from 'react';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RecipeCarouselViewModel } from './RecipeCarouselViewModel';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { type CarouselApi } from '@/components/ui/carousel';

export function RecipeCarousel({ title, recipes, smallTitle, onRecipePage = false }: RecipeCarouselViewModel) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      {title && (
        <div className='container mt-6 md:mt-16 '>
          <h2 className={cn(smallTitle && 'text-5xl')}>{title}</h2>
        </div>
      )}

      <Carousel
        setApi={setApi}
        className=' mt-9 md:mt-14'
      >
        <div className='flex justify-center'>
          <CarouselContent className='ml-6 md:ml-10 lg:ml-16 mr-4 xl:mr-0 xl:ml-auto flex gap-4'>
            {recipes?.map((recipe, index) => {
              if (index >= 5) {
                return null;
              }
              return (
                <CarouselItem
                  key={index}
                  className=' w-[264px] md:w-[300px]'
                >
                  <RecipeCard
                    {...recipe}
                    onRecipePage={onRecipePage}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>

        <div className='flex container justify-between mt-7 xl:hidden'>
          <CarouselPrevious className='border-accentCol border-2 bg-transparrent' />
          <div className='flex items-center gap-2'>
            {recipes &&
              recipes.map((recipe, index) => {
                if (index >= 4) {
                  return null;
                }

                return (
                  <svg
                    key={index}
                    width='8'
                    height='8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={cn(index + 1 === current ? 'opacity-100' : 'opacity-50')}
                  >
                    <circle
                      cx='4'
                      cy='4'
                      r='4'
                      fill='#99565E'
                    />
                  </svg>
                );
              })}
          </div>
          <CarouselNext className='border-accentCol border-2 bg-transparrent' />
        </div>
      </Carousel>
    </>
  );
}
