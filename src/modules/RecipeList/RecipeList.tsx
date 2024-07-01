import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { RecipeListViewModel } from './RecipeListViewModel';
import { fetchEntriesByType } from '@/utils/getEntriesByType';
import { useEffect, useState } from 'react';
import fetchAssets from '@/utils/getAssets';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import RecipeSearch from '@/components/RecipeSearch/ResipeSearch';
import RecipeCategorySearch from '@/components/RecipeCategorySearch/RecipeCategorySearch';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([] as any[]);
  const [cleanedRecipes, setCleanedRecipes] = useState([] as RecipeViewModel[]);
  const [originalCleanedRecipes, setOriginalCleanedRecipes] = useState([] as RecipeViewModel[]);

  const getRecipes = async () => {
    const recipes = await fetchEntriesByType({ type: 'recipe' });
    return recipes;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await getRecipes();
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const cleanedRecipes = recipes.map((recipe) => {
      const fields = recipe.fields;

      return {
        id: recipe.sys.id,
        title: fields.title,
        description: fields.beskrivelse,
        splashImage: fields.billede.fields.file.url,
        totalTime: fields.tidIAlt,
        workTime: fields.tilberedningstid,
        DinnerType: fields.mltidstype,
        skillLevel: fields.svrhedsgrad,
        MealType: fields.kosttype,
      } as RecipeViewModel;
    });

    setCleanedRecipes(cleanedRecipes);
    setOriginalCleanedRecipes(cleanedRecipes);
  }, [recipes]);

  console.log('cleanedRecipes', cleanedRecipes);

  return (
    <section className='container'>
      <div className='flex mt-10 md:mt-20 flex-wrap gap-6'>
        <RecipeSearch
          recipes={originalCleanedRecipes}
          setCleanedRecipes={setCleanedRecipes}
        />
        <RecipeCategorySearch
          recipes={originalCleanedRecipes}
          setCleanedRecipes={setCleanedRecipes}
        />
      </div>
      <ul className='mt-6 md:mt-10 flex flex-col gap-8  sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:justify-between md list-none'>
        {cleanedRecipes?.map((recipe, index) => (
          <li
            key={`recipe-${index}`}
            className='mx-auto md:mx-0 w-full'
          >
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeList;
