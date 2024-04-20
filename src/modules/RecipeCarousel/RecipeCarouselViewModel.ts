import { RecipeViewModel } from '@/view-models/RecipeViewModel';

export interface RecipeCarouselViewModel {
  title?: string;
  recipes?: Array<RecipeViewModel>;
}
