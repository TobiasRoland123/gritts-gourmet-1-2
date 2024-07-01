import { cn } from '@/lib/utils';
import { RecipeViewModel } from '@/view-models/RecipeViewModel';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type RecipeCardProps = RecipeViewModel & {};

export const RecipeCard = ({
  title,
  description,
  howTo,
  totalTime,
  workTime,
  freezable,
  splashImage,
  id,
  onRecipePage,
}: RecipeCardProps) => {
  return (
    <a
      href={id ? (onRecipePage ? `${id}` : `opskrifter/${id}`) : '#'}
      className={cn(' w-full max-w-full  rounded-lg bg-accentCol overflow-hidden block')}
    >
      {splashImage ? (
        <Image
          src={`https:${splashImage}`}
          alt={'test'}
          width={300}
          height={300}
          quality={70}
          className='w-full aspect-square object-cover'
        />
      ) : (
        'missing image'
      )}
      <div className='px-3 py-4 '>
        {title ? <h3 className=' text-primaryCol truncate  text-2xl md:text-3xl'>{title}</h3> : null}
        {description ? <p className='text-primaryCol mt-5 line-clamp-5'>{description};</p> : null}
        <div className='mt-6 flex justify-between'>
          {totalTime ? (
            <div>
              <p className='opacity-75 text-primaryCol'>Tid i alt:</p>
              <div className='flex gap-2 mt-2'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.25 3.75V1.25H18.75V3.75H11.25ZM13.75 17.5H16.25V10H13.75V17.5ZM15 27.5C13.4583 27.5 12.0052 27.2031 10.6406 26.6094C9.27604 26.0156 8.08333 25.2083 7.0625 24.1875C6.04167 23.1667 5.23438 21.974 4.64062 20.6094C4.04688 19.2448 3.75 17.7917 3.75 16.25C3.75 14.7083 4.04688 13.2552 4.64062 11.8906C5.23438 10.526 6.04167 9.33333 7.0625 8.3125C8.08333 7.29167 9.27604 6.48438 10.6406 5.89062C12.0052 5.29688 13.4583 5 15 5C16.2917 5 17.5312 5.20833 18.7188 5.625C19.9062 6.04167 21.0208 6.64583 22.0625 7.4375L23.8125 5.6875L25.5625 7.4375L23.8125 9.1875C24.6042 10.2292 25.2083 11.3438 25.625 12.5312C26.0417 13.7188 26.25 14.9583 26.25 16.25C26.25 17.7917 25.9531 19.2448 25.3594 20.6094C24.7656 21.974 23.9583 23.1667 22.9375 24.1875C21.9167 25.2083 20.724 26.0156 19.3594 26.6094C17.9948 27.2031 16.5417 27.5 15 27.5ZM15 25C17.4167 25 19.4792 24.1458 21.1875 22.4375C22.8958 20.7292 23.75 18.6667 23.75 16.25C23.75 13.8333 22.8958 11.7708 21.1875 10.0625C19.4792 8.35417 17.4167 7.5 15 7.5C12.5833 7.5 10.5208 8.35417 8.8125 10.0625C7.10417 11.7708 6.25 13.8333 6.25 16.25C6.25 18.6667 7.10417 20.7292 8.8125 22.4375C10.5208 24.1458 12.5833 25 15 25Z'
                    fill='#F3F8D8'
                  />
                </svg>

                <p className='text-primaryCol font-semibold'>{totalTime} min</p>
              </div>
            </div>
          ) : null}

          {workTime ? (
            <div>
              <p className='opacity-75 text-primaryCol'>Arbejdstid</p>
              <div className='flex gap-2 mt-2'>
                <svg
                  width='26'
                  height='31'
                  viewBox='0 0 26 31'
                  fill='none'
                >
                  <path
                    d='M25.0484 1.24633C24.7459 0.850304 24.3867 0.536351 23.9914 0.322477C23.5961 0.108604 23.1724 -0.000981585 22.7447 6.62436e-06C22.3169 0.000994833 21.8936 0.112537 21.4988 0.328236C21.1041 0.543935 20.7457 0.859546 20.4444 1.25697L0.265523 28.356C0.149911 28.5104 0.0678361 28.7024 0.0277593 28.9121C-0.0123174 29.1218 -0.00894592 29.3418 0.0375265 29.5492C0.0839988 29.7567 0.17189 29.9442 0.29214 30.0924C0.41239 30.2405 0.560647 30.344 0.721627 30.3922C2.05357 30.7963 3.41638 31.0003 4.78363 31C8.66225 31 12.5455 29.3468 16.1955 26.1056C19.8803 22.8341 22.0158 19.1386 22.1052 18.9821C22.2394 18.7481 22.3046 18.4584 22.2888 18.1664C22.2731 17.8744 22.1773 17.5997 22.0193 17.3927L19.8444 14.5421L25.0669 7.24842C25.6682 6.44638 26.0035 5.36617 26 4.24238C25.9965 3.11859 25.6545 2.04197 25.0484 1.24633ZM20.1055 18.3318C18.634 20.5376 16.9525 22.4873 15.1023 24.1333C11.1018 27.6662 6.97827 29.1021 2.81878 28.4123L15.1557 11.8495L20.1055 18.3318ZM23.7358 5.54808L23.7149 5.57695L18.5259 12.8205L16.452 10.1021L21.7651 2.96035C21.8947 2.79073 22.0484 2.65619 22.2177 2.56439C22.387 2.4726 22.5684 2.42535 22.7516 2.42535C22.9348 2.42535 23.1162 2.4726 23.2855 2.56439C23.4547 2.65619 23.6085 2.79073 23.7381 2.96035C23.8676 3.12996 23.9704 3.33132 24.0405 3.55293C24.1106 3.77454 24.1467 4.01207 24.1467 4.25194C24.1467 4.49181 24.1106 4.72933 24.0405 4.95094C23.9704 5.17255 23.8676 5.37391 23.7381 5.54353L23.7358 5.54808Z'
                    fill='#F3F8D8'
                  />
                </svg>

                <p className='text-primaryCol font-semibold'>{workTime} min</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
};

export default RecipeCard;
