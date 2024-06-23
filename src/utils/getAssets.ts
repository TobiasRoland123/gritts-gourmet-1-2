const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

type fetchEntryProps = {
  id: string;
};

export async function fetchAssets({ id }: fetchEntryProps) {
  /*   const response = await client.getContentTypes();
   */ const asset = await client.getAsset(id);

  /*   console.log('response', response);
   */
  // console.log('entries', asset);

  if (asset.fields) return asset.fields.file.url;
}

export default fetchAssets;
