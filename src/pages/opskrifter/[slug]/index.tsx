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
import TwitterShareButton from '@/components/ShareComponents/TwitterShareButton/TwitterShareButton';

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
                <h1 className='container text-center -mt-12 md:mt-0 lg:text-6xl'>
                  <HyphenatedText text={recipe.title} />
                </h1>
              ) : null}

              <div className='grid md:h-fit grid-cols-2 gap-x-10 gap-y-2 border-b md:border-0 border-accentCol pb-10 container mt-6'>
                {recipe.totalTime ? (
                  <div>
                    <p className='opacity-75 text-accentCol'>Tid i alt:</p>
                    <div className='flex gap-2 mt-2 items-center'>
                      <svg
                        width='42'
                        height='49'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.464 4.821V.25H28.18v4.571H14.464Zm4.572 25.143h4.571V16.25h-4.571v13.714ZM21.32 48.25c-2.819 0-5.476-.543-7.971-1.629-2.495-1.085-4.676-2.562-6.543-4.428-1.867-1.867-3.343-4.048-4.428-6.543C1.293 33.155.75 30.498.75 27.679c0-2.82.543-5.477 1.629-7.972 1.085-2.495 2.561-4.676 4.428-6.543 1.867-1.866 4.048-3.343 6.543-4.428 2.495-1.086 5.152-1.629 7.971-1.629 2.362 0 4.629.381 6.8 1.143a22.222 22.222 0 0 1 6.115 3.314l3.2-3.2 3.2 3.2-3.2 3.2a22.222 22.222 0 0 1 3.314 6.115 20.389 20.389 0 0 1 1.143 6.8c0 2.819-.543 5.476-1.629 7.971-1.085 2.495-2.562 4.676-4.428 6.543-1.867 1.867-4.048 3.343-6.543 4.428-2.495 1.086-5.152 1.629-7.972 1.629Zm0-4.571c4.42 0 8.19-1.562 11.315-4.686 3.123-3.124 4.685-6.895 4.685-11.314 0-4.42-1.561-8.19-4.685-11.315-3.124-3.123-6.896-4.685-11.315-4.685s-8.19 1.562-11.314 4.685C6.883 19.488 5.321 23.26 5.321 27.68c0 4.419 1.562 8.19 4.686 11.314 3.124 3.124 6.895 4.686 11.314 4.686Z'
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
                        width='41'
                        height='48'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M38.785 1.93A5.184 5.184 0 0 0 37.148.5a4.022 4.022 0 0 0-1.93-.5 4.028 4.028 0 0 0-1.93.508 5.198 5.198 0 0 0-1.632 1.438L.41 43.906c-.179.24-.306.536-.368.861-.062.325-.057.665.015.987.072.32.208.611.394.84.187.23.416.39.665.465 2.063.626 4.173.941 6.29.941 6.005 0 12.018-2.56 17.67-7.578 5.705-5.066 9.012-10.788 9.15-11.03.208-.363.31-.811.285-1.263a2.18 2.18 0 0 0-.418-1.198l-3.367-4.414 8.086-11.294c.931-1.242 1.45-2.914 1.445-4.654-.005-1.74-.535-3.407-1.473-4.64ZM31.13 28.385c-2.278 3.415-4.882 6.434-7.747 8.983-6.194 5.47-12.579 7.693-19.02 6.625l19.103-25.645 7.664 10.037ZM36.752 8.59l-.032.044-8.035 11.216-3.21-4.21L33.7 4.585c.2-.263.438-.471.7-.613.263-.142.544-.216.827-.216.284 0 .565.074.827.216.262.142.5.35.7.613.201.262.36.574.469.917.109.343.164.711.164 1.083 0 .371-.055.739-.164 1.082a3.005 3.005 0 0 1-.468.918l-.004.007Z'
                          fill='#99565E'
                        />
                      </svg>

                      <p className='text-accentCol font-semibold'>{recipe.workTime} min</p>
                    </div>
                  </div>
                ) : null}

                {recipe.freezable ? (
                  <div className=''>
                    <span className='text-accentCol opacity-75'>Fryseegnet</span>
                    <svg
                      width='48'
                      height='53'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='m47.93 31.049-.967-3.6-10.252 2.75-7.037-4.067 7.037-4.066 10.252 2.75.967-3.6-6.652-1.783L48 15.553l-2.796-4.835-6.594 3.81 1.782-6.652-3.6-.967-2.75 10.252-7.246 4.183V13.06l7.515-7.503-2.645-2.633-4.87 4.87V0h-5.592v7.643l-4.858-4.859-2.633 2.633 7.49 7.503v8.319l-7.071-4.078-2.75-10.252-3.6.967 1.783 6.652-6.722-3.891-2.796 4.846 6.605 3.81L0 21.076l.967 3.6 10.24-2.75 7.294 4.206-7.293 4.217L.967 27.6 0 31.2l6.652 1.783-6.605 3.81 2.796 4.834 6.722-3.88-1.782 6.641 3.6.967 2.749-10.24 7.072-4.09v8.26l-7.491 7.503 2.633 2.633 4.858-4.87v7.643h5.592v-7.782l4.882 4.858 2.621-2.633-7.503-7.491V30.92l7.247 4.195 2.75 10.24 3.6-.967-1.783-6.64 6.594 3.81L48 36.71l-6.722-3.88 6.652-1.783Z'
                        fill='#99565E'
                      />
                    </svg>
                  </div>
                ) : null}

                <div>
                  <p className='opacity-75 text-accentCol'>Del </p>
                  <div className='flex gap-4 mt-1'>
                    <FacebookShareButton
                      url={shareUrl}
                      className='cursor-pointer'
                    >
                      <svg
                        width='47'
                        height='47'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M5.222 0h36.556A5.222 5.222 0 0 1 47 5.222v36.556A5.222 5.222 0 0 1 41.778 47H5.222A5.222 5.222 0 0 1 0 41.778V5.222A5.222 5.222 0 0 1 5.222 0Zm33.945 5.222h-6.528a9.139 9.139 0 0 0-9.139 9.14v6.527h-5.222v7.833H23.5V47h7.833V28.722h7.834V20.89h-7.834v-5.222a2.611 2.611 0 0 1 2.611-2.611h5.223V5.222Z'
                          fill='#99565E'
                        />
                      </svg>
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={shareUrl}
                      title={recipe.title}
                      className='Demo__some-network__share-button'
                    >
                      <svg
                        width='48'
                        height='50'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M28.565 20.77 46.435 0h-4.236L26.686 18.035 14.29 0H0l18.74 27.271L0 49.053h4.235l16.383-19.045 13.09 19.045H48L28.565 20.77Zm-5.799 6.742-1.9-2.716L5.764 3.188h6.503l12.19 17.439 1.9 2.716 15.847 22.666H35.7L22.766 27.512Z'
                          fill='#99565E'
                        />
                      </svg>
                    </TwitterShareButton>
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
