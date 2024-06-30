import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { fetchEntries } from '../../../utils/contentFullPage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import { HyphenatedText } from '@/components/HyphenatedText/HyphenatedText';
import { Toggle } from '@/components/ui/toggle';
import IngredientToggle from '@/components/IngredientToggle/IngredientToggle';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { RecipeCarousel } from '@/modules/RecipeCarousel/RecipeCarousel';
import { RecipeCarouselViewModel } from '@/modules/RecipeCarousel/RecipeCarouselViewModel';
import { CircleArrowUp } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import FacebookShareButton from '@/components/ShareComponents/FacebookShareButton/FacebookShareButton';

const RecipeDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState({} as RecipeViewModel);
  const [recipeCarouselData, setRecipeCarouselData] = useState({} as RecipeCarouselViewModel);
  // console.log('slug', slug);

  const getRecipe = async () => {
    console.log('getRecipe');

    const data = slug ? await fetchEntries({ id: slug.toString() }) : null;
    // console.log('data', data);
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
      howTo: data?.fremgangsmetode,
    };
    setRecipe(cleanedData);
  };

  const getFeaturedRecipes = async () => {
    const entries = await fetchEntries({ id: '34ZA6EWopJEr593ZI6XOk0' });
    console.log('getStatic entries', entries);

    const recipesCleaned = entries.recipe.map((recipe: any) => {
      return {
        title: recipe.fields.title,
        description: recipe.fields.beskrivelse,
        howTo: recipe.fields.fremgangsmetode,
        totalTime: recipe.fields.tidIAlt,
        workTime: recipe.fields.tilberedningstid,
        freezable: recipe.fields.fryseegnet,
        splashImage: recipe.fields.billede.fields.file.url,
        id: recipe.sys.id,
      };
    });

    setRecipeCarouselData({ title: entries.title, recipes: recipesCleaned });
  };

  useEffect(() => {
    console.log('useEffect run');

    if (slug) {
      getRecipe();
    }

    getFeaturedRecipes();
  }, [slug]);

  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  let wakeLock: any = null;

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator && isWakeLockActive) {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => {
            console.log('Screen Wake Lock was released');
          });
          console.log('Screen Wake Lock is active');
        }
      } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    const releaseWakeLock = () => {
      wakeLock?.release().then(() => {
        wakeLock = null;
        console.log('Screen Wake Lock was released');
      });
    };

    if (isWakeLockActive) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [isWakeLockActive]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <section className='min-h-screen'>
        {recipe?.splashImage ? (
          <div className='recipe_splash'>
            <Image
              src={'https:' + recipe.splashImage}
              alt='billede af retten'
              width={1750}
              height={500}
              className='w-full
            '
              priority={true}
            />
          </div>
        ) : null}
        <div className='md:container'>
          <div className='md:bg-primaryCol relative md:-mt-20 md:border-b border-accentCol md:pb-6'>
            <div className='md:flex'>
              {recipe.title ? (
                <h1 className='container text-center -mt-12 md:mt-0'>
                  <HyphenatedText text={recipe.title} />
                </h1>
              ) : null}

              <div className='grid md:h-fit grid-cols-2 gap-x-10 gap-y-2 border-b md:border-0 border-accentCol pb-10 container mt-6'>
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

                      <p className='text-accentCol font-semibold'>{recipe.workTime} min</p>
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
                      className='shrink-0'
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
                    <FacebookShareButton
                      url={shareUrl}
                      className='cursor-pointer'
                    >
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
                      </svg>
                    </FacebookShareButton>
                    <svg
                      width='24'
                      height='24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.96 0h10.08C20.88 0 24 3.12 24 6.96v10.08A6.96 6.96 0 0 1 17.04 24H6.96C3.12 24 0 20.88 0 17.04V6.96A6.96 6.96 0 0 1 6.96 0Zm-.24 2.4A4.32 4.32 0 0 0 2.4 6.72v10.56a4.317 4.317 0 0 0 4.32 4.32h10.56a4.32 4.32 0 0 0 4.32-4.32V6.72a4.317 4.317 0 0 0-4.32-4.32H6.72ZM18.3 4.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z'
                        fill='#99565E'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className='container mt-6'>
          {recipe.ingredients ? (
            <>
              <section className='md:flex mt-10 gap-10 justify-between'>
                <article className='md:order-2'>
                  <h3 className='hidden md:inline-block md:mt-6 lg:mt-0'>Ingredienser</h3>
                  <div
                    className='border mt-6 border-accentCol rounded-lg'
                    id='ingredients'
                  >
                    <ul className='list-none'>
                      {recipe.ingredients.map((ingredient: any, index: number) => (
                        <li
                          key={`ingredient-${index}`}
                          className='border-b last-of-type:border-b-0 border-accentCol has-[data-[checked]]:order-2 order-1 '
                        >
                          <IngredientToggle ingredient={ingredient} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                <article className='mt-10 md:mt-0'>
                  <h2>Sådan gør du:</h2>
                  <div className='mt-6 flex gap-4 text-xl font-bold items-center'>
                    <Switch
                      id='keep-screen-on'
                      className='data-[state="checked"]:bg-accentCol border-2 border-accentCol [&>span]:ring-2 [&>span]:ring-accentCol'
                      checked={isWakeLockActive}
                      onClick={() => setIsWakeLockActive(!isWakeLockActive)}
                    />
                    <Label htmlFor='keep-screen-on'>Hold skærmen tændt</Label>
                  </div>
                  <div className='px-6 mt-6 max-w-prose leading-[70px] [&_p]:leading-5'>
                    {documentToReactComponents(recipe.howTo)}
                  </div>
                </article>
                <a
                  href='#ingredients'
                  aria-label='Gå til ingredienser'
                  className='flex gap-4 items-center mt-10 mx-auto text-accentCol md:hidden'
                >
                  <CircleArrowUp
                    size={48}
                    color='#99565E'
                    strokeWidth={1.25}
                  />
                  <span className='font-bold text-2xl'>Tilbage til ingredienser</span>
                </a>
              </section>
            </>
          ) : null}
        </article>
      </section>
      <section>
        {
          <RecipeCarousel
            {...recipeCarouselData}
            smallTitle
            onRecipePage={true}
          />
        }
      </section>
    </>
  );
};

export default RecipeDetails;
