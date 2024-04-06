import HeroFrontpage from '@/modules/HeroFrontpage/HeroFrontpage';
import { HeroFrontpageMock } from '@/modules/HeroFrontpage/HeroFrontpage.mock';
import { log } from 'console';
import React from 'react';

// ########API KEYS ############
const url =
  'https://cdn.contentful.com/spaces/uf7we2b8oizk/environments/master/entries/1fLEYQN6QvUEOalSVSA2gZ?access_token=r3RuRAJjJ4E4HAnisuF47UC5ZnuZJxVSYX1esDkI-iM';

// const fetchApi = async (url: string) => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Error');

//       const data = response.json();

//       return data;

//   } catch (error) {
//     console.error(error);
//   }
// };

// const newData = fetchApi(url);

// console.log(newData);

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  !isLoading
    ? fetch(url)
        .then((response) => response.json()) // Transform the data into json
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.error('Error:', error))
    : null;

  React.useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return <>{/* <HeroFrontpage {...HeroFrontpageMock} /> */}</>;
}
