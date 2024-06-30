import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { TextWithImageViewModel } from './TextWithImageViewModel';
import Image from 'next/image';

const TextWithImage = ({ text, image }: TextWithImageViewModel) => {
  return (
    <article className='container mt-10 flex flex-col gap-6 md:flex-row md:items-start'>
      <div className='[&>h3]:mt-6 [&>h3]:text-2xl [&_p]:leading-6 [&>p]:mt-2 order-2 md:order-1'>
        {documentToReactComponents(text)}
      </div>
      <Image
        src={`https:${image}`}
        alt='image'
        height={500}
        width={500}
        className='order-1 md:order-2 object-contain flex-1 mx-auto'
      />
    </article>
  );
};

export default TextWithImage;
