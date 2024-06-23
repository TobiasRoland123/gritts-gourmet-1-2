import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { RecipeListViewModel } from './RecipeListViewModel';

const RecipeList = ({ recipes }: RecipeListViewModel) => {
  return (
    <section>
      <ul>
        {recipes?.map((recipe, index) => (
          <li key={`recipe-${index}`}>
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeList;
