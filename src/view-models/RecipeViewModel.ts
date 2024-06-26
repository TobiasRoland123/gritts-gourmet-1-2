export interface RecipeViewModel {
  id?: string;
  title?: string;
  description?: string;
  howTo?: any;
  totalTime?: string;
  workTime?: string;
  freezable?: boolean;
  splashImage?: string;
  DinnerType?: string;
  skillLevel?: string;
  MealType?: string;
  ingredients?: string[];
  onRecipePage?: boolean;
}
