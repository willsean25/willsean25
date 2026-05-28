import { GroceryStore } from './types';

export const STORE_DISPLAY_NAMES: Record<GroceryStore, string> = {
  'trader-joes': "Trader Joe's",
  'whole-foods': 'Whole Foods Market',
  walmart: 'Walmart Supercenter',
  costco: 'Costco',
  kroger: 'Kroger',
  target: 'Target',
  safeway: 'Safeway',
  publix: 'Publix',
  aldi: 'ALDI',
  sprouts: 'Sprouts Farmers Market',
};

export const STORE_EMOJIS: Record<GroceryStore, string> = {
  'trader-joes': '🌺',
  'whole-foods': '🌿',
  walmart: '⭐',
  costco: '🏦',
  kroger: '🛍️',
  target: '🎯',
  safeway: '🛍️',
  publix: '🍊',
  aldi: '💰',
  sprouts: '🌱',
};

export const STORE_LAYOUT_CONTEXT: Record<GroceryStore, string> = {
  'trader-joes': `Trader Joe's layout: Produce near entrance (Aisle 1), Bakery near entrance,
    Wine/Beer near front right, Pantry/Dry goods center aisles (2-4),
    Frozen foods along left wall (Aisles 5-6), Meat/Seafood at back left (Aisle 7-8),
    Dairy/Eggs at back right (Aisle 8-9). Private-label products throughout.`,
  'whole-foods': `Whole Foods layout: Produce at entrance (Aisle 1), Prepared foods/Hot bar left of entrance,
    Bulk foods (Aisle 3-4), Bakery near entrance, Meat counter at back center,
    Seafood counter at back right, Dairy/Eggs at back left, Supplements (Aisle 10-11).
    365 Everyday Value brand throughout.`,
  walmart: `Walmart Supercenter grocery section on right side: Produce at grocery entrance,
    Bakery near deli, Deli/Prepared foods at front of grocery, Meat at back,
    Dairy at far back wall, Frozen center-back aisles. Great Value brand throughout.`,
  costco: `Costco warehouse: Fresh produce near entrance, Bakery/Bread near entrance left,
    Deli/Prepared foods at back right, Meat section at back center,
    Dairy at back far right, Frozen foods center warehouse. Kirkland Signature brand.`,
  kroger: `Kroger: Produce at entrance, Floral near entrance, Bakery/Deli at front,
    Meat/Seafood at back, Dairy/Eggs at back right wall, Frozen center-back.
    Kroger brand and Simple Truth organic. Club card for discounts.`,
  target: `Target Market Fresh: Produce at grocery entrance, Grab & Go refrigerated section,
    Dairy/Frozen at back of grocery area. Good & Gather brand throughout.
    Limited fresh meat. Strong packaged goods selection.`,
  safeway: `Safeway: Produce at entrance, Bakery/Deli near entrance,
    Meat/Seafood at back center, Dairy at back right wall,
    Frozen center aisles. O Organics and Open Nature brands. Club Card discounts.`,
  publix: `Publix: Produce at entrance right, Bakery at entrance left,
    Deli/Prepared foods near front, Meat/Seafood at back center,
    Dairy at back wall, Frozen center-back. Greenwise organic brand. BOGO deals.`,
  aldi: `ALDI small-format: Produce/Refrigerated near entrance, Center aisles for pantry,
    Frozen at back, Dairy at back wall. Weekly ALDI Finds center aisle.
    Mostly private-label. Cart deposit required.`,
  sprouts: `Sprouts: Produce takes center stage (middle of store),
    Bulk bins (Aisle 3-5), Meat/Seafood counter at back,
    Dairy at back right, Frozen at back left, Vitamins/Supplements full aisle.
    Natural/organic focus at competitive prices.`,
};

export const CATEGORY_LABELS: Record<string, string> = {
  produce: '🥦 Produce',
  'meat-seafood': '🥩 Meat & Seafood',
  'dairy-eggs': '🥛 Dairy & Eggs',
  pantry: '🫙 Pantry',
  frozen: '❄️ Frozen',
  bakery: '🍞 Bakery',
  beverages: '🥤 Beverages',
  snacks: '🍿 Snacks',
  condiments: '🧴 Condiments',
  international: '🌍 International',
  bulk: '🎺 Bulk',
  deli: '🥪 Deli',
};
