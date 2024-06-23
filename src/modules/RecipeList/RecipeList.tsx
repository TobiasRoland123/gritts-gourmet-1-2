import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { RecipeListViewModel } from './RecipeListViewModel';
import { fetchEntriesByType } from '@/utils/getEntriesByType';
import { useEffect, useState } from 'react';
import fetchAssets from '@/utils/getAssets';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import RecipeSearch from '@/components/RecipeSearch/ResipeSearch';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([] as any[]);
  const [cleanedRecipes, setCleanedRecipes] = useState([] as RecipeViewModel[]);

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
      } as RecipeViewModel;
    });

    setCleanedRecipes(cleanedRecipes);
  }, [recipes]);

  console.log('cleanedRecipes', cleanedRecipes);

  return (
    <section className='container'>
      <div>
        <RecipeSearch />
      </div>
      <ul className='mt-6 md:mt-10 flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-around lg:justify-between'>
        {cleanedRecipes?.map((recipe, index) => (
          <li
            key={`recipe-${index}`}
            className='mx-auto md:mx-0'
          >
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeList;
