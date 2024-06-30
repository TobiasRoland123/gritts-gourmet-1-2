import { RecipeViewModel } from '@/view-models/RecipeViewModel';

export interface RecipeCarouselViewModel {
  title?: string;
  smallTitle?: boolean;
  onRecipePage?: boolean;
  recipes?: Array<RecipeViewModel>;
}
