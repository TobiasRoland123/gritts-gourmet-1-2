import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { fetchEntries } from '../../../utils/contentFullPage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import { HyphenatedText } from '@/components/HyphenatedText/HyphenatedText';

const RecipeDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState({} as RecipeViewModel);
  console.log('slug', slug);

  const getRecipe = async () => {
    console.log('getRecipe');

    const data = slug ? await fetchEntries({ id: slug.toString() }) : null;
    console.log('data', data);
    if (!data) {
      console.log('No data found');
      return;
    }

    const cleanedData = await {
      title: data?.title,
      splashImage: data?.billede.fields?.file?.url,
      totalTime: data?.tidIAlt,
      workTime: data?.tilberedningstid,
      freezable: data?.fryseegnet,
      ingredients: data?.ingredienser,
    };
    setRecipe(cleanedData);
  };

  useEffect(() => {
    console.log('useEffect run');

    if (slug) {
      getRecipe();
    }
  }, [slug]);

  return (
    <section>
      {recipe?.splashImage ? (
        <div className='recipe_splash'>
          <Image
            src={'https:' + recipe.splashImage}
            alt='billede af retten'
            width={1750}
            height={500}
          />
        </div>
      ) : null}
      {recipe.title ? (
        <h1 className='container text-center -mt-12'>
          <HyphenatedText text={recipe.title} />
        </h1>
      ) : null}
      <article className='container mt-6'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-2 border-b border-accentCol pb-6'>
          {recipe.totalTime ? (
            <div>
              <p className='opacity-75 text-accentCol'>Tid i alt:</p>
              <div className='flex gap-2 mt-2 items-center'>
                <svg
                  width='24'
                  height='27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8.25 2.75V.25h7.5v2.5h-7.5Zm2.5 13.75h2.5V9h-2.5v7.5Zm1.25 10c-1.54 0-3-.3-4.36-.9a11.5 11.5 0 0 1-6-6 10.8 10.8 0 0 1-.89-4.35c0-1.54.3-3 .9-4.36a11.5 11.5 0 0 1 6-6 11.15 11.15 0 0 1 8.08-.27c1.18.42 2.3 1.03 3.33 1.82l1.75-1.75 1.75 1.75-1.75 1.75c.8 1.04 1.4 2.15 1.82 3.34a11.15 11.15 0 0 1-.27 8.08 11.5 11.5 0 0 1-6 6c-1.37.6-2.82.89-4.36.89Zm0-2.5c2.42 0 4.48-.85 6.19-2.56a8.43 8.43 0 0 0 2.56-6.19c0-2.42-.85-4.48-2.56-6.19A8.43 8.43 0 0 0 12 6.5c-2.42 0-4.48.85-6.19 2.56a8.43 8.43 0 0 0-2.56 6.19c0 2.42.85 4.48 2.56 6.19A8.43 8.43 0 0 0 12 24Z'
                    fill='#99565E'
                  />
                </svg>

                <p className='text-accentCol font-semibold'>{recipe.totalTime} min</p>
              </div>
            </div>
          ) : null}
          {recipe.workTime ? (
            <div>
              <p className='opacity-75 text-accentCol'>Arbejdstid:</p>
              <div className='flex gap-2 mt-2 items-center'>
                <svg
                  width='26'
                  height='31'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M25.05 1.25c-.3-.4-.66-.71-1.06-.93a2.6 2.6 0 0 0-2.5 0c-.39.22-.74.54-1.05.94L.27 28.36c-.12.15-.2.34-.24.55-.04.21-.04.43 0 .64.05.2.14.4.26.54.12.15.27.25.43.3 1.33.4 2.7.61 4.06.61 3.88 0 7.77-1.65 11.42-4.9a31.58 31.58 0 0 0 5.9-7.12 1.5 1.5 0 0 0-.08-1.59l-2.18-2.85 5.23-7.3c.6-.8.93-1.87.93-3 0-1.12-.35-2.2-.95-3ZM20.1 18.33a30.1 30.1 0 0 1-5 5.8c-4 3.54-8.13 4.97-12.3 4.28l12.35-16.56 4.95 6.48Zm3.63-12.78-.03.03-5.18 7.24-2.08-2.72 5.32-7.14c.12-.17.28-.3.45-.4a1.12 1.12 0 0 1 1.07 0c.16.1.32.23.45.4s.23.37.3.6a2.33 2.33 0 0 1 0 1.4c-.07.21-.17.41-.3.58Z'
                    fill='#99565E'
                  />
                </svg>

                <p className='text-accentCol font-semibold'>{recipe.tilberedningstid} min</p>
              </div>
            </div>
          ) : null}

          {recipe.freezable ? (
            <div className='flex gap-2 items-center'>
              <svg
                width='30'
                height='30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m27.04 17.49-.5-1.81-5.15 1.38-3.54-2.04 3.54-2.05 5.16 1.39.49-1.82-3.35-.9 3.38-1.94-1.4-2.43-3.32 1.91.9-3.34-1.82-.49-1.38 5.16-3.64 2.1V8.44l3.78-3.77-1.33-1.32-2.45 2.44V1.87h-2.82v3.85l-2.44-2.44L9.83 4.6l3.76 3.77v4.19l-3.55-2.05-1.39-5.16-1.8.49.89 3.34-3.38-1.96-1.4 2.44 3.32 1.92-3.35.9.49 1.8 5.15-1.38 3.66 2.12-3.66 2.12-5.15-1.38-.49 1.8 3.35.9-3.33 1.92 1.4 2.43 3.39-1.95-.9 3.34 1.81.49 1.39-5.15 3.55-2.06v4.15l-3.76 3.78 1.32 1.32 2.44-2.45v3.84h2.82v-3.9l2.45 2.43 1.32-1.32-3.77-3.77v-4.13l3.64 2.1 1.38 5.16 1.81-.5-.9-3.33 3.32 1.92 1.41-2.44-3.38-1.95 3.35-.9Z'
                  fill='#99565E'
                />
              </svg>
              <span className='text-accentCol font-semibold'>Fryseegnet</span>
            </div>
          ) : null}

          <div>
            <p className='opacity-75 text-accentCol'>Del </p>
            <div className='flex gap-2 mt-1'>
              <svg
                width='24'
                height='24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2.67 0h18.66A2.67 2.67 0 0 1 24 2.67v18.66A2.67 2.67 0 0 1 21.33 24H2.67A2.67 2.67 0 0 1 0 21.33V2.67A2.67 2.67 0 0 1 2.67 0ZM20 2.67h-3.33A4.67 4.67 0 0 0 12 7.33v3.34H9.33v4H12V24h4v-9.33h4v-4h-4V8a1.33 1.33 0 0 1 1.33-1.33H20v-4Z'
                  fill='#99565E'
                />
              </svg>{' '}
              <svg
                width='28'
                height='28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.4.67h11.2a7.74 7.74 0 0 1 7.73 7.73v11.2a7.73 7.73 0 0 1-7.73 7.73H8.4A7.74 7.74 0 0 1 .67 19.6V8.4A7.73 7.73 0 0 1 8.4.67Zm-.27 2.66a4.8 4.8 0 0 0-4.8 4.8v11.74a4.8 4.8 0 0 0 4.8 4.8h11.74a4.8 4.8 0 0 0 4.8-4.8V8.13a4.8 4.8 0 0 0-4.8-4.8H8.13Zm12.87 2a1.67 1.67 0 1 1 0 3.34 1.67 1.67 0 0 1 0-3.34Zm-7 2a6.67 6.67 0 1 1 0 13.34 6.67 6.67 0 0 1 0-13.34ZM14 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'
                  fill='#99565E'
                />
              </svg>
            </div>{' '}
          </div>
        </div>
        {recipe.ingredients ? (
          <ul>
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <li key={`ingredient-${index}`}>{ingredient}</li>
            ))}
          </ul>
        ) : null}
      </article>
    </section>
  );
};

export default RecipeDetails;
