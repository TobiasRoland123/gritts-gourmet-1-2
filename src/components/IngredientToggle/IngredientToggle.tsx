// import { Toggle } from '@radix-ui/react-toggle';
import { Checkbox } from '@headlessui/react';

import { useState } from 'react';
import { HyphenatedText } from '../HyphenatedText/HyphenatedText';

type IngredientToggleProps = {
  ingredient: string;
};

const IngredientToggle = ({ ingredient }: IngredientToggleProps) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className='group size-12 rounded-md last-of-type:border-b-0 data-[checked]:opacity-70 w-full flex justify-between h-fit p-4 gap-2'
    >
      <span className='text-accentCol group-data-[checked]:line-through block '>
        <HyphenatedText text={ingredient} />
      </span>

      <svg
        className='block group-data-[checked]:hidden shrink-0 '
        width='20'
        height='20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='10'
          cy='10'
          r='9.5'
          stroke='#99565E'
        />
      </svg>
      <svg
        className='hidden  group-data-[checked]:block shrink-0 '
        width='20'
        height='20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='10'
          cy='10'
          r='9.5'
          stroke='#99565E'
        />
        <circle
          cx='10'
          cy='10'
          r='8'
          fill='#99565E'
        />
      </svg>
    </Checkbox>
  );
};

export default IngredientToggle;
