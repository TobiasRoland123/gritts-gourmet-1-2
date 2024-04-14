import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import { log } from 'console';
import React from 'react';
import placeholder_img from '@/public/mock/placeholder.jpg';
import fetchData from '../api/fetchData';
import fetchAssets from '@/api/fetchAssets';

const baseUrl = 'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/';

const entry_id = 'entries/1fLEYQN6QvUEOalSVSA2gZ';
const url = `${baseUrl}${entry_id}`;
const data = fetchData({ url });

const assetsUrl = `${baseUrl}assets/`;
const tempAssets = fetchAssets({ url: assetsUrl });

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [fields, setFields] = React.useState<any>([]);
  const [assets, setAssets] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getData = async () => {
    const a = await data;
    // console.log(a);
    setFields(a.fields);
    /*  setAssets(a.includes.Asset); */
    setIsLoading(false);
  };

  const getAssets = async () => {
    const a = await tempAssets;
    console.log('assets:', a);
    let images = await a.items.map((item: any) => {
      if (item.fields.title === 'herofrontpage-mobile' || item.fields.title === 'herofrontpage-desktop') {
        return `https:${item.fields.file.url}`;
      }
    });
    images = images.filter((image: any) => image !== undefined);
    console.log('images:', images);

    setAssets(images);
    setIsLoading(false);
  };

  getData();

  getAssets();

  return (
    <>
      <HeroFrontpage
        {...fields}
        image={{ srcMobile: assets[0], srcDesktop: assets[1], alt: 'test' }}
      />
    </>
  );
}
