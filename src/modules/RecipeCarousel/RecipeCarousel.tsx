import * as React from 'react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RecipeCarouselViewModel } from './RecipeCarouselViewModel';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

export function RecipeCarousel({ title, recipes }: RecipeCarouselViewModel) {
  return (
    <Carousel className=' mt-9'>
      <div>
        <CarouselContent>
          {recipes?.map((recipe, index) => {
            return (
              <CarouselItem key={index}>
                <RecipeCard {...recipe} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </div>

      <div className='flex container justify-between'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
