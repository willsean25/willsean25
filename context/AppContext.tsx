import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppState,
  UserProfile,
  MealPlan,
  GroceryList,
  StoreNavigation,
  ImportedRecipe,
} from '@/lib/types';
import {
  loadState,
  saveProfile,
  saveMealPlan,
  saveGroceryList,
  saveStoreNavigation,
  saveImportedRecipe,
  clearState,
} from '@/lib/storage';

interface AppContextValue extends AppState {
  isLoaded: boolean;
  setProfile: (p: UserProfile) => Promise<void>;
  setMealPlan: (p: MealPlan) => Promise<void>;
  setGroceryList: (l: GroceryList) => Promise<void>;
  setStoreNavigation: (n: StoreNavigation) => Promise<void>;
  addImportedRecipe: (r: ImportedRecipe) => Promise<void>;
  toggleGroceryItem: (id: string) => Promise<void>;
  toggleNavItem: (name: string) => Promise<void>;
  resetApp: () => Promise<void>;
}

const Ctx = createContext<AppContextValue | null>(null);

const initial: AppState = {
  profile: null,
  mealPlan: null,
  groceryList: null,
  storeNavigation: null,
  importedRecipes: [],
  onboardingComplete: false,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initial);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      setIsLoaded(true);
    });
  }, []);

  async function setProfile(profile: UserProfile) {
    await saveProfile(profile);
    setState((s) => ({ ...s, profile, onboardingComplete: true }));
  }

  async function setMealPlan(mealPlan: MealPlan) {
    await saveMealPlan(mealPlan);
    setState((s) => ({ ...s, mealPlan }));
  }

  async function setGroceryList(groceryList: GroceryList) {
    await saveGroceryList(groceryList);
    setState((s) => ({ ...s, groceryList }));
  }

  async function setStoreNavigation(storeNavigation: StoreNavigation) {
    await saveStoreNavigation(storeNavigation);
    setState((s) => ({ ...s, storeNavigation }));
  }

  async function addImportedRecipe(recipe: ImportedRecipe) {
    await saveImportedRecipe(recipe);
    setState((s) => ({
      ...s,
      importedRecipes: [recipe, ...s.importedRecipes.filter((r) => r.id !== recipe.id)],
    }));
  }

  async function toggleGroceryItem(itemId: string) {
    setState((s) => {
      if (!s.groceryList) return s;
      const updated: GroceryList = {
        ...s.groceryList,
        items: s.groceryList.items.map((item) =>
          item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
        ),
      };
      saveGroceryList(updated);
      return { ...s, groceryList: updated };
    });
  }

  async function toggleNavItem(name: string) {
    setState((s) => {
      if (!s.storeNavigation) return s;
      const updated: StoreNavigation = {
        ...s.storeNavigation,
        items: s.storeNavigation.items.map((item) =>
          item.ingredientName === name ? { ...item, isChecked: !item.isChecked } : item
        ),
      };
      saveStoreNavigation(updated);
      return { ...s, storeNavigation: updated };
    });
  }

  async function resetApp() {
    await clearState();
    setState(initial);
  }

  return (
    <Ctx.Provider
      value={{
        ...state,
        isLoaded,
        setProfile,
        setMealPlan,
        setGroceryList,
        setStoreNavigation,
        addImportedRecipe,
        toggleGroceryItem,
        toggleNavItem,
        resetApp,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
