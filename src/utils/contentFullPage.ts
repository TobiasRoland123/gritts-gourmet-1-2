const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

type fetchEntryProps = {
  id: string;
};

export async function fetchEntries({ id }: fetchEntryProps) {
  /*   const response = await client.getContentTypes();
   */ const entries = await client.getEntry(id);

  /*   console.log('response', response);
   */
  // console.log('entries', entries);

  if (entries.fields) return entries.fields;
}

export default fetchEntries;
