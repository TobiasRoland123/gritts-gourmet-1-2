import RecipeCard from '@/components/RecipeCard/RecipeCard';

const RecipeDetails = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <h1>Recipe Details {params.slug}</h1>
    </div>
  );
};

export default RecipeDetails;
