import { cn } from '@/lib/utils';
import { ButtonViewModel } from './ButtonViewModel';

const Button = ({ text, children, arialabel, href, target, ...props }: ButtonViewModel) => {
  return (
    <button className={cn('bg-accentCol rounded-lg py-2 px-4  text-primaryCol mt-8', props.className)}>
      <p className='font-bold text-2xl'>{children ? children : text}</p>
    </button>
  );
};

export default Button;
