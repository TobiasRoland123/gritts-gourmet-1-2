import { cn } from '@/lib/utils';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import Image from 'next/image';

type RecipeCardProps = RecipeViewModel & {};

export const RecipeCard = ({ title, description, totalTime, workTime, freezable, splashImage }: RecipeCardProps) => {
  return (
    <article className={cn('max-w-[264px] rounded-lg bg-accentCol overflow-hidden mx-5')}>
      {splashImage ? (
        <Image
          src={splashImage}
          alt={'test'}
          width={500}
          height={500}
          className='w-full'
        />
      ) : (
        'missing image'
      )}
      <div className='px-3 py-4 '>
        {title ? <h3 className=' text-primaryCol truncate'>{title}</h3> : null}
        {description ? <p className='text-primaryCol mt-5 line-clamp-5'>{description}</p> : null}
      </div>
    </article>
  );
};

export default RecipeCard;
