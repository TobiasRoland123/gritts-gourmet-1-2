type fetchDataProps = {
  url: string;
  imageIds?: Array<string>; //if image ids are passed, then url should be baseUrl
};

export const fetchData = async ({ url }: fetchDataProps) => {
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
};

export default fetchData;
