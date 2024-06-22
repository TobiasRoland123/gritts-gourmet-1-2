const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

type fetchEntryProps = {
  url: string;
};

export async function fetchEntries({ url }: fetchEntryProps) {
  /*   const response = await client.getContentTypes();
   */ const entries = await client.getEntry(url);

  /*   console.log('response', response);
   */ console.log('entries', entries);

  if (entries.fields) return entries.fields;
}

export default fetchEntries;
