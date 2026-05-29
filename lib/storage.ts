import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, UserProfile, MealPlan, GroceryList, StoreNavigation, ImportedRecipe } from './types';

const KEY = 'groceryai_state';

const defaults: AppState = {
  profile: null,
  mealPlan: null,
  groceryList: null,
  storeNavigation: null,
  importedRecipes: [],
  onboardingComplete: false,
};

export async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export async function saveState(partial: Partial<AppState>): Promise<void> {
  try {
    const current = await loadState();
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }));
  } catch {
    // ignore storage errors
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await saveState({ profile, onboardingComplete: true });
}

export async function saveMealPlan(mealPlan: MealPlan): Promise<void> {
  await saveState({ mealPlan });
}

export async function saveGroceryList(groceryList: GroceryList): Promise<void> {
  await saveState({ groceryList });
}

export async function saveStoreNavigation(nav: StoreNavigation): Promise<void> {
  await saveState({ storeNavigation: nav });
}

export async function saveImportedRecipe(recipe: ImportedRecipe): Promise<void> {
  const state = await loadState();
  const recipes = [recipe, ...state.importedRecipes.filter((r) => r.id !== recipe.id)];
  await saveState({ importedRecipes: recipes });
}

export async function clearState(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
