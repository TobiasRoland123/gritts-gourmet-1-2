import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import { log } from 'console';
import React from 'react';
import placeholder_img from '@/public/mock/placeholder.jpg';
import fetchData from '../api/fetchData';

const baseUrl = 'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/';

const entry_id = 'entries/1fLEYQN6QvUEOalSVSA2gZ';
const url = `${baseUrl}${entry_id}`;
const data = fetchData({ url });

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [fields, setFields] = React.useState<any>([]);
  const [assets, setAssets] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getData = async () => {
    const a = await data;
    console.log(a);
    setFields(a.fields);
    /*  setAssets(a.includes.Asset); */
    setIsLoading(false);
  };

  getData();

  const assetUrls = fields?.image?.map((image: any) => {
    return `assets/${image.sys.id}`;
  });

  const images = async () => await fetchData(assetUrls[0]);

  return (
    <>
      <HeroFrontpage
        {...fields}
        image={{ srcMobile: placeholder_img, srcDesktop: placeholder_img, alt: 'test' }}
        /*  image={
          isLoading
            ? { srcMobile: placeholder_img, srcDesktop: placeholder_img, alt: 'test' }
            : {
                srcMobile: `https:${assets[0]?.fields.file.url}`,
                srcDesktop: `https:${assets[1]?.fields.file.url}`,
                alt: 'test',
              }
        } */
      />

      {/* <button onClick={logAssets}>Log assets</button> */}
    </>
  );
}
