import { ButtonViewModel } from '@/components/Button/ButtonViewModel';
import { ImageViewModel } from '@/components/View-Models/ImageViewModel';

export interface HeroFrontpageViewModel {
  headline: string;
  specialWord: string;
  description: string;
  button: ButtonViewModel;
  image: ImageViewModel;
  notOnFrontpage: boolean;
}
