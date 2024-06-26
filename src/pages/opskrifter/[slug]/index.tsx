import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { fetchEntries } from '../../../utils/contentFullPage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const RecipeDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState({} as any);
  console.log('slug', slug);

  const getRecipe = async () => {
    console.log('getRecipe');

    const data = slug ? await fetchEntries({ id: slug.toString() }) : null;
    console.log('data', data);
    if (!data) {
      console.log('No data found');
      return;
    }
    setRecipe(data);
  };

  useEffect(() => {
    console.log('useEffect run');

    if (slug) {
      getRecipe();
    }
  }, [slug]); // Include slug in the dependency array

  return (
    <section>
      {recipe?.billede?.fields?.file?.url ? (
        <Image
          src={'https:' + recipe.billede.fields.file.url}
          alt='billede af retten'
          width={1750}
          height={500}
        />
      ) : null}
      {recipe.title ? <h1> {recipe.title} </h1> : null}

      {recipe.ingredienser ? (
        <ul>
          {recipe.ingredienser.map((ingredient: any, index: number) => (
            <li key={`ingredient-${index}`}>{ingredient}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default RecipeDetails;
