import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import { log } from 'console';
import React from 'react';

// ########API KEYS ############
/* const url =
  'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/entries/1fLEYQN6QvUEOalSVSA2gZ?access_token=r3RuRAJjJ4E4HAnisuF47UC5ZnuZJxVSYX1esDkI-iM';

const fetchApi = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error');

    const data = response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}; */

const data = fetch(
  'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/entries/1fLEYQN6QvUEOalSVSA2gZ?access_token=r3RuRAJjJ4E4HAnisuF47UC5ZnuZJxVSYX1esDkI-iM'
)
  .then((response) => response.json())
  .then((data) => {
    return data.fields;
  });

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newData, setNewData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const myData = async () => {
    const a = await data;
    console.log(a);
    setNewData(a);
    return a;
  };

  myData();

  return (
    <>
      <HeroFrontpage
        {...HeroFrontpageMock}
        headline={newData.headline}
      />
    </>
  );
}
