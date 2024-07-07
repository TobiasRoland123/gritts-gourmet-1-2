const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

type fetchEntryByTypeProps = {
  type: string;
};

export async function fetchEntriesByType({ type }: fetchEntryByTypeProps) {
  /*   const response = await client.getContentTypes();
   */
  const entries = await client.getEntries({ content_type: type });

  /*   console.log('response', response);
   */
  // console.log('entries', entries);

  if (entries.items) return entries.items;
}

export default fetchEntriesByType;
