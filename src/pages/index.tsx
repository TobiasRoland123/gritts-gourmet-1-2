import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import React, { useEffect } from 'react';
import placeholder_img from '@/public/mock/placeholder.jpg';
import fetchData from '../api/fetchData';
import fetchAssets from '@/api/fetchAssets';
import { RecipeCarousel } from '@/modules/RecipeCarousel/RecipeCarousel';
import { RecipeCarouselMock } from '@/modules/RecipeCarousel/RecipeCarouselMock';
import { fetchEntries } from '../utils/contentFullPage';
const baseUrl = 'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

interface HomeProps {
  pageName: string;
  modules: any;
}

export default function Home({ ...props }: HomeProps) {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // const [modules, setFields] = React.useState<any>([]);
  // const [assets, setAssets] = React.useState<any>([]);
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  console.log('props', props);

  const { pageName, modules } = props;
  const frontPageHeroData = modules.find((module: any) => module.sys.contentType.sys.id === 'heroFrontpage');

  console.log('frontPageHeroData', frontPageHeroData);

  return (
    <>
      <h1>{pageName}</h1>

      <button
        onClick={() => {
          console.log('clicked');

          fetchEntries({ url: '25j0x4RNIhW84GaGHmetP7' });
        }}
      >
        click me
      </button>
      <HeroFrontpage
        {...frontPageHeroData.fields}
        image={{
          srcMobile: frontPageHeroData.fields.image.find((img: any) => img.fields.title === 'herofrontpage-mobile').fields.file
            .url,
          srcDesktop: frontPageHeroData.fields.image.find((img: any) => img.fields.title === 'herofrontpage-desktop').fields.file
            .url,
        }}
      />
      <RecipeCarousel {...RecipeCarouselMock} />
    </>
  );
}

export async function getStaticProps() {
  const entries = await fetchEntries({ url: '25j0x4RNIhW84GaGHmetP7' });
  console.log('getStatic entries', entries);

  const pageName = entries?.titel || 'Page';
  const modules = entries?.module || [];

  /*  const fields = data.map((item: any) => item.fields);
  console.log('fields', fields); */
  return {
    props: {
      pageName: pageName,
      modules: modules,
    },
  };
}
