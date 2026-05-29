import { UserProfile, MealPlan, GroceryItem, GroceryStore } from './types';
import { STORE_DISPLAY_NAMES, STORE_LAYOUT_CONTEXT } from './store-data';
import { parseJsonFromText, getWeekDates } from './utils';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

function getApiKey(): string {
  return process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? '';
}

async function callClaude(system: string, userMsg: string, maxTokens = 8000): Promise<string> {
  const key = getApiKey();
  if (!key) throw new Error('ANTHROPIC_API_KEY not set. Add EXPO_PUBLIC_ANTHROPIC_API_KEY to your .env file.');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

export async function generateMealPlan(profile: UserProfile): Promise<MealPlan> {
  const storeName = STORE_DISPLAY_NAMES[profile.preferredStore];
  const dates = getWeekDates();

  const system = `You are an expert nutritionist and meal planner AI. Generate realistic, personalized weekly meal plans.
Respond with valid JSON only. Optimize ingredient overlap. Use realistic pricing for ${storeName}.`;

  const prompt = `Generate a 7-day meal plan:
- Household: ${profile.householdSize} people, Budget: $${profile.weeklyBudget}/week
- Daily calories: ${profile.macroGoals.calories} kcal, Protein: ${profile.macroGoals.protein}g, Carbs: ${profile.macroGoals.carbs}g, Fat: ${profile.macroGoals.fat}g
- Dietary: ${profile.dietaryRestrictions.join(', ') || 'none'}, Allergies: ${profile.allergies.join(', ') || 'none'}
- Preferred proteins: ${profile.preferredProteins.join(', ') || 'any'}, Goal: ${profile.fitnessGoal}
- Cooking: ${profile.cookingLevel}, max ${profile.cookingTimeMinutes} min, Store: ${storeName}

Return JSON: { "summary": "...", "totalEstimatedCost": 0.00, "days": [{ "day": "Monday", "date": "${dates[0]}", "estimatedCost": 0.00, "totalCalories": 0, "totalProtein": 0, "totalCarbs": 0, "totalFat": 0, "meals": [{ "id": "uid", "name": "Meal", "type": "breakfast", "servings": ${profile.householdSize}, "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "prepTime": 0, "imageEmoji": "🍳", "ingredients": ["1 cup oats"], "instructions": ["Step 1"] }] }] }
Include breakfast/lunch/dinner every day, snack on 3-4 days. Keep weekly cost under $${profile.weeklyBudget}.`;

  const text = await callClaude(system, prompt, 8000);
  const data = parseJsonFromText<Partial<MealPlan>>(text, {});
  if (!data.days?.length) throw new Error('Invalid meal plan response');

  return {
    id: Math.random().toString(36).substring(2),
    createdAt: new Date().toISOString(),
    weekStart: dates[0],
    days: data.days,
    totalEstimatedCost: data.totalEstimatedCost ?? 0,
    summary: data.summary ?? '',
  };
}

export async function generateGroceryList(
  profile: UserProfile,
  mealPlan: MealPlan
): Promise<{ items: GroceryItem[]; totalEstimatedCost: number; budgetRemaining: number }> {
  const storeName = STORE_DISPLAY_NAMES[profile.preferredStore];
  const allIngredients = mealPlan.days
    .flatMap((d) => d.meals.flatMap((m) => m.ingredients.map((ing) => `${ing} (for ${m.name})`)))
    .join('\n');

  const system = `You are a grocery optimization AI. Convert meal plans to optimized lists with real-world pricing.
Respond with valid JSON only. Consolidate duplicates. Use prices from ${storeName}.`;

  const prompt = `Build grocery list for ${storeName}. Budget: $${profile.weeklyBudget}. Household: ${profile.householdSize}.\n\nIngredients:\n${allIngredients}\n\nReturn JSON: { "totalEstimatedCost": 0.00, "budgetRemaining": 0.00, "items": [{ "id": "uid", "name": "Item", "quantity": "2", "unit": "lbs", "estimatedPrice": 0.00, "category": "produce", "brand": "Brand", "isChecked": false, "notes": "tip", "mealsUsedIn": ["Meal A"] }] }\nCategories: produce, meat-seafood, dairy-eggs, pantry, frozen, bakery, beverages, snacks, condiments, international, bulk, deli`;

  const text = await callClaude(system, prompt, 6000);
  return parseJsonFromText(text, { items: [], totalEstimatedCost: 0, budgetRemaining: profile.weeklyBudget });
}

export async function generateStoreNavigation(items: GroceryItem[], store: GroceryStore, storeLocation: string) {
  const storeName = STORE_DISPLAY_NAMES[store];
  const layout = STORE_LAYOUT_CONTEXT[store];
  const itemList = items.map((i) => `${i.quantity} ${i.unit} ${i.name}`).join('\n');

  const system = `You are a grocery store navigation AI with deep knowledge of US store layouts.
Store layout for ${storeName}: ${layout}\nRespond with valid JSON only.`;

  const prompt = `Generate precise navigation for ${storeName}${storeLocation ? ` (${storeLocation})` : ''}.\n\nItems:\n${itemList}\n\nReturn JSON: { "estimatedShoppingTime": 25, "totalCost": 0.00, "shoppingRoute": ["Produce — Aisle 1"], "items": [{ "ingredientName": "name", "productName": "Exact ${storeName} product", "brand": "Brand", "aisleNumber": "4", "aisleSection": "Section", "department": "Dept", "shelfLocation": "Middle shelf", "price": 0.00, "pricePerUnit": "$0.00/oz", "storeTip": "tip", "alternatives": [{ "name": "Alt", "brand": "Brand", "price": 0.00, "reason": "Why" }] }] }`;

  const text = await callClaude(system, prompt, 8000);
  return parseJsonFromText(text, { estimatedShoppingTime: 30, totalCost: 0, shoppingRoute: [], items: [] });
}

export async function importRecipe(recipeText: string, store: GroceryStore) {
  const storeName = STORE_DISPLAY_NAMES[store];
  const layout = STORE_LAYOUT_CONTEXT[store];

  const system = `You are a recipe parsing and grocery navigation AI.
Extract recipes from any text and map ingredients to ${storeName}.
Store layout: ${layout}\nRespond with valid JSON only.`;

  const prompt = `Parse this recipe and generate store navigation for ${storeName}:\n\n"""\n${recipeText}\n"""\n\nReturn JSON: { "recipe": { "name": "Name", "servings": 4, "prepTime": 15, "cookTime": 30, "calories": 450, "tags": ["healthy"], "ingredients": [{ "name": "ing", "quantity": "2", "unit": "cups", "notes": "opt" }], "instructions": ["Step 1"] }, "navigation": { "estimatedShoppingTime": 20, "totalCost": 0.00, "shoppingRoute": ["Aisle 1"], "items": [{ "ingredientName": "name", "productName": "Product", "brand": "Brand", "aisleNumber": "3", "aisleSection": "Section", "department": "Dept", "shelfLocation": "Middle shelf", "price": 0.00, "pricePerUnit": "$0.00/lb", "storeTip": "Tip", "alternatives": [{ "name": "Alt", "brand": "Brand", "price": 0.00, "reason": "Why" }] }] } }`;

  const text = await callClaude(system, prompt, 6000);
  return parseJsonFromText<{ recipe: unknown; navigation: unknown }>(text, { recipe: null, navigation: null });
}
