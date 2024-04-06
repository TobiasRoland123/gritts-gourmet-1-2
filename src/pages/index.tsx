import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import { log } from 'console';
import React from 'react';
import placeholder_img from '@/public/mock/placeholder.jpg';

const url = `https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`;

console.log(url);

const data = fetch(url)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [fields, setFields] = React.useState<any>([]);
  const [assets, setAssets] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getData = async () => {
    const a = await data;
    console.log(a);
    setFields(a.items[0].fields);
    setAssets(a.includes.Asset);
    setIsLoading(false);
  };

  getData();

  const logAssets = () => {
    console.log(`https:${assets[1]?.fields.file.url}`);
  };

  return (
    <>
      <HeroFrontpage
        {...fields}
        image={
          isLoading
            ? { srcMobile: placeholder_img, srcDesktop: placeholder_img, alt: 'test' }
            : {
                srcMobile: `https:${assets[0]?.fields.file.url}`,
                srcDesktop: `https:${assets[1]?.fields.file.url}`,
                alt: 'test',
              }
        }
      />

      <button onClick={logAssets}>Log assets</button>
    </>
  );
}
