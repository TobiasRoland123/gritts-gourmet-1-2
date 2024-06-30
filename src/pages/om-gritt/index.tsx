import fetchEntries from '@/utils/contentFullPage';
import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import React from 'react';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';

type AboutProps = {
  pageName: string;
  modules: any;
  recipes: RecipeViewModel[];
};

const OmGritt = ({ ...props }: AboutProps) => {
  console.log('props', props);
  const { pageName, modules, recipes } = props;

  if (modules.length === 0) return null;
  const frontPageHeroData = modules.find((module: any) => module.sys.contentType.sys.id === 'heroFrontpage').fields;

  return (
    <>
      <HeroFrontpage
        {...frontPageHeroData}
        image={{
          srcMobile: frontPageHeroData.image.find((img: any) => img.fields.title === 'om-gritt-mobile').fields.file.url,
          srcDesktop: frontPageHeroData.image.find((img: any) => img.fields.title === 'om-gritt-desktop').fields.file.url,
        }}
      />
    </>
  );
};

export async function getStaticProps() {
  const entries = await fetchEntries({ id: '7ugYpZL18iPhGjcRNUJBLD' });
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

export default OmGritt;
