import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import { useEffect, useState } from 'react';

type RecipeSearchProps = {
  recipes: RecipeViewModel[];
  setCleanedRecipes: (recipes: RecipeViewModel[]) => void;
};

const RecipeSearch = ({ recipes, setCleanedRecipes }: RecipeSearchProps) => {
  const [searchString, setSearchString] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    console.log('searchString', searchString);

    if (!searchString) {
      setCleanedRecipes(recipes);
      return;
    }
    const filteredRecipes = recipes?.filter((recipe) => {
      return recipe?.title?.toLowerCase().includes(searchString.toLowerCase());
    });

    setCleanedRecipes(filteredRecipes);
  }, [searchString]);

  return (
    <div className='flex flex-col max-w-72'>
      <label htmlFor='recipeSearch'>Søg</label>
      <input
        type='text'
        id='recipeSearch'
        placeholder='Søg efter opskrift...'
        onChange={handleSearch}
      />
    </div>
  );
};

export default RecipeSearch;
