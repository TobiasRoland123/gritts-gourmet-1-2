import Hero from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import RecipeList from '@/modules/RecipeList/RecipeList';
import fetchEntries from '@/utils/contentFullPage';

interface RecipesProps {
  pageName: string;
  modules: any;
}

export default function Recipes({ ...props }: RecipesProps) {
  const { pageName, modules } = props;

  if (modules.length === 0) return null;
  const HeroData = modules.find((module: any) => module.sys.contentType.sys.id === 'heroFrontpage').fields;
  return (
    <>
      <Hero
        {...HeroData}
        image={{
          srcMobile: HeroData.image.find((img: any) => img.fields.title === 'heroBurger-mobile').fields.file.url,
          srcDesktop: HeroData.image.find((img: any) => img.fields.title === 'heroBurger-desktop').fields.file.url,
        }}
      />
      <RecipeList />
    </>
  );
}

export async function getStaticProps() {
  const entries = await fetchEntries({ id: 'aiR9azVKXAeIKRfuU4JvU' });
  console.log('getStatic entries', entries);

  const pageName = entries?.titel || 'Page';
  const modules = entries?.module || [];

  return {
    props: {
      pageName,
      modules,
    },
  };
}
