import { url } from 'inspector';

type fetchDataProps = {
  url: string;
  imageIds?: Array<string>; //if image ids are passed, then url should be baseUrl
};

/* export const fetchData = async ({ url }: fetchDataProps) => {
  const data = await fetch(url, {
    // Pass the url property of fetchDataProps to the fetch function
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return data;
}; */

const client = require('contentful').createClient({
  space: 'uf7we2b8oizk',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchData = async (url: fetchDataProps) => {
  const entries = client
    .getEntries(url.url)
    .then((entry: any) => console.log(entry))
    .catch((error: any) => console.log(error));
};
export default fetchData;
