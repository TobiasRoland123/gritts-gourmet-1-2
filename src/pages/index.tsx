import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import React from 'react';
import { RecipeCarousel } from '@/modules/RecipeCarousel/RecipeCarousel';
import { fetchEntries } from '../utils/contentFullPage';
import { fetchAssets } from '../utils/getAssets';
import { Metadata } from 'next';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';

export const metadata: Metadata = {
  title: "Gritt's Gourmet | Forside",
};

interface HomeProps {
  pageName: string;
  modules: any;
  recipes: RecipeViewModel[];
}

export default function Home({ ...props }: HomeProps) {
  console.log('props', props);
  const { pageName, modules, recipes } = props;

  if (modules.length === 0) return null;
  const frontPageHeroData = modules.find((module: any) => module.sys.contentType.sys.id === 'heroFrontpage').fields;

  const recipeCarouselRawData = modules.find((module: any) => module.sys.contentType.sys.id === 'featuredRecipes').fields;

  const recipeCarouselData = {
    title: recipeCarouselRawData.title,
    recipes: recipes,
  };

  console.log('recipeCarouselData cleaned', recipeCarouselData);

  return (
    <>
      <button
        onClick={() => {
          console.log('clicked');
          console.log('recipeCarouselData', recipeCarouselData);
        }}
      >
        click me
      </button>
      <HeroFrontpage
        {...frontPageHeroData}
        image={{
          srcMobile: frontPageHeroData.image.find((img: any) => img.fields.title === 'herofrontpage-mobile').fields.file.url,
          srcDesktop: frontPageHeroData.image.find((img: any) => img.fields.title === 'herofrontpage-desktop').fields.file.url,
        }}
      />
      <RecipeCarousel {...recipeCarouselData} />
    </>
  );
}

export async function getStaticProps() {
  const entries = await fetchEntries({ id: '25j0x4RNIhW84GaGHmetP7' });
  console.log('getStatic entries', entries);

  const pageName = entries?.titel || 'Page';
  const modules = entries?.module || [];

  const recipeCarouselRawData = modules.find((module: any) => module.sys.contentType.sys.id === 'featuredRecipes').fields;
  const recipeIds = recipeCarouselRawData.recipe.map((recipe: any) => recipe.sys.id);

  const fetchRecipes = async (ids: string[]) => {
    const recipes = await Promise.all(
      ids.map(async (id) => {
        const recipe = await fetchEntries({ id });
        const splashImageUrl = await fetchAssets({ id: recipe.billede.sys.id });

        return {
          title: recipe.title,
          description: recipe.beskrivelse,
          howTo: recipe.fremgangsmetode,
          totalTime: recipe.tidIAlt,
          workTime: recipe.tilberedningstid,
          freezable: recipe.fryseegnet,
          splashImage: splashImageUrl,
        };
      })
    );
    return recipes;
  };

  const recipes = await fetchRecipes(recipeIds);

  return {
    props: {
      pageName,
      modules,
      recipes,
    },
  };
}
