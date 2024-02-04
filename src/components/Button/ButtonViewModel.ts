import { ReactNode } from 'react';

export interface ButtonViewModel {
  text?: string;
  href?: string;
  target?: string;
  arialabel?: string;
  children?: ReactNode;
  className?: string;
}
