export type DietaryRestriction =
  | 'none'
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'halal'
  | 'kosher'
  | 'nut-free';

export type FitnessGoal =
  | 'weight-loss'
  | 'muscle-gain'
  | 'maintenance'
  | 'athletic-performance'
  | 'general-health';

export type CookingLevel = 'beginner' | 'intermediate' | 'advanced';

export type GroceryStore =
  | 'trader-joes'
  | 'whole-foods'
  | 'walmart'
  | 'costco'
  | 'kroger'
  | 'target'
  | 'safeway'
  | 'publix'
  | 'aldi'
  | 'sprouts';

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserProfile {
  name: string;
  householdSize: number;
  weeklyBudget: number;
  macroGoals: MacroGoals;
  dietaryRestrictions: DietaryRestriction[];
  allergies: string[];
  preferredProteins: string[];
  fitnessGoal: FitnessGoal;
  preferredStore: GroceryStore;
  storeLocation: string;
  cookingLevel: CookingLevel;
  cookingTimeMinutes: number;
  mealPreferences: string[];
  isPremium: boolean;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  ingredients: string[];
  instructions?: string[];
  imageEmoji: string;
}

export interface DayPlan {
  day: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  estimatedCost: number;
}

export interface MealPlan {
  id: string;
  createdAt: string;
  weekStart: string;
  days: DayPlan[];
  totalEstimatedCost: number;
  summary: string;
}

export type GroceryCategory =
  | 'produce'
  | 'meat-seafood'
  | 'dairy-eggs'
  | 'pantry'
  | 'frozen'
  | 'bakery'
  | 'beverages'
  | 'snacks'
  | 'condiments'
  | 'international'
  | 'bulk'
  | 'deli';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  estimatedPrice: number;
  category: GroceryCategory;
  brand?: string;
  isChecked: boolean;
  notes?: string;
  mealsUsedIn: string[];
}

export interface GroceryList {
  id: string;
  createdAt: string;
  mealPlanId: string;
  items: GroceryItem[];
  totalEstimatedCost: number;
  budgetRemaining: number;
  store: GroceryStore;
}

export interface StoreNavigationItem {
  ingredientName: string;
  productName: string;
  brand: string;
  aisleNumber: string;
  aisleSection: string;
  department: string;
  shelfLocation: string;
  price: number;
  pricePerUnit: string;
  alternatives: {
    name: string;
    brand: string;
    price: number;
    reason: string;
  }[];
  storeTip: string;
  isChecked?: boolean;
}

export interface StoreNavigation {
  id: string;
  store: GroceryStore;
  storeLocation: string;
  createdAt: string;
  items: StoreNavigationItem[];
  shoppingRoute: string[];
  estimatedShoppingTime: number;
  totalCost: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
  notes?: string;
}

export interface ImportedRecipe {
  id: string;
  name: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  calories?: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  sourceUrl?: string;
  navigation?: StoreNavigation;
}

export interface AppState {
  profile: UserProfile | null;
  mealPlan: MealPlan | null;
  groceryList: GroceryList | null;
  storeNavigation: StoreNavigation | null;
  importedRecipes: ImportedRecipe[];
  onboardingComplete: boolean;
}
