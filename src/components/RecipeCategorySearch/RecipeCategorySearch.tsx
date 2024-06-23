import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select/Select';

type RecipeCategorySearchProps = {
  recipes: RecipeViewModel[];
  setCleanedRecipes: (recipes: RecipeViewModel[]) => void;
};

const RecipeCategorySearch = ({ recipes, setCleanedRecipes }: RecipeCategorySearchProps) => {
  const [searchString, setSearchString] = useState('');

  const handleChange = (value: string) => {
    setSearchString(value);
  };

  useEffect(() => {
    console.log('searchString', searchString);

    if (!searchString) {
      setCleanedRecipes(recipes);
      return;
    }
    const filteredRecipes = recipes?.filter((recipe) => {
      if (searchString === 'alle') {
        return recipe;
      } else if (recipe?.title?.toLowerCase().includes(searchString.toLowerCase())) {
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
    <div className='flex flex-col max-w-72 w-full mx-auto md:mx-0'>
      <label
        htmlFor='recipeCategorySearch'
        className='hidden'
        aria-label='Vælg kategori...'
      >
        Vælg kategori
      </label>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='max-w-72 bg-accentCol text-primaryCol h-10'>
          <SelectValue placeholder='Vælg Kategori' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='alle'>Alle</SelectItem>
          <SelectItem value='morgenmad'>Morgenmad</SelectItem>
          <SelectItem value='frokost'>Frokost</SelectItem>
          <SelectItem value='aftensmad'>Aftensmad</SelectItem>
          <SelectItem value='dessert'>Dessert</SelectItem>
          <SelectItem value='snack'>Snack</SelectItem>
          <SelectItem value='vegetar'>Vegetar</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RecipeCategorySearch;
