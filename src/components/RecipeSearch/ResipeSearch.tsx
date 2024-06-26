import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

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
      if (recipe?.title?.toLowerCase().includes(searchString.toLowerCase())) {
        return recipe;
      } else if (recipe?.DinnerType?.toLowerCase().includes(searchString.toLowerCase())) {
        return recipe;
      } else if (recipe?.MealType?.toLowerCase().includes(searchString.toLowerCase())) {
        return recipe;
      }
    });

    setCleanedRecipes(filteredRecipes);
  }, [searchString, recipes, setCleanedRecipes]);

  return (
    <div className='flex flex-col w-full md:max-w-72 w-full mx-auto md:mx-0'>
      <label
        htmlFor='recipeSearch'
        className='hidden'
        aria-label='Søg efter opskrift...'
      >
        Søg
      </label>
      <Input
        id='recipeSearch'
        placeholder='Søg efter opskrifter....'
        onChange={handleSearch}
        className='bg-accentCol text-primaryCol placeholder:text-primaryCol h-10 font-[16px]'
      />
    </div>
  );
};

export default RecipeSearch;
