import { useState, useEffect } from 'react';

export interface GroceryItem {
  id: string;
  name: string;
  isAvailable: boolean;
}

const STORAGE_KEY_LEGACY = 'grocery-items-status';
const STORAGE_KEY_DATA = 'grocery-items-data';
const STORAGE_KEY_ONBOARDING = 'grocery-onboarding-complete';

// Fixed pool of items that are always in the system
const FIXED_ITEMS: GroceryItem[] = [
  { id: '1', name: 'Milk', isAvailable: true },
  { id: '2', name: 'Eggs', isAvailable: true },
  { id: '3', name: 'Vinegar', isAvailable: true },
  { id: '4', name: 'Bread', isAvailable: true },
  { id: '5', name: 'Butter', isAvailable: true },
  { id: '6', name: 'Cheese', isAvailable: true },
  { id: '7', name: 'Yogurt', isAvailable: true },
  { id: '8', name: 'Chicken', isAvailable: true },
  { id: '9', name: 'Rice', isAvailable: true },
  { id: '10', name: 'Pasta', isAvailable: true },
  { id: '11', name: 'Tomato Sauce', isAvailable: true },
  { id: '12', name: 'Olive Oil', isAvailable: true },
  { id: '13', name: 'Salt', isAvailable: true },
  { id: '14', name: 'Pepper', isAvailable: true },
  { id: '15', name: 'Sugar', isAvailable: true },
  { id: '16', name: 'Flour', isAvailable: true },
  { id: '17', name: 'Coffee', isAvailable: true },
  { id: '18', name: 'Tea', isAvailable: true },
  { id: '19', name: 'Orange Juice', isAvailable: true },
  { id: '20', name: 'Water Bottles', isAvailable: true },
  { id: '21', name: 'Apples', isAvailable: true },
  { id: '22', name: 'Bananas', isAvailable: true },
  { id: '23', name: 'Carrots', isAvailable: true },
  { id: '24', name: 'Onions', isAvailable: true },
  { id: '25', name: 'Garlic', isAvailable: true },
  { id: '26', name: 'Potatoes', isAvailable: true },
  { id: '27', name: 'Tomatoes', isAvailable: true },
  { id: '28', name: 'Lettuce', isAvailable: true },
  { id: '29', name: 'Toilet Paper', isAvailable: true },
  { id: '30', name: 'Paper Towels', isAvailable: true },
];

export const useGroceryStore = () => {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    // Try loading new data format first (includes custom items)
    const storedData = localStorage.getItem(STORAGE_KEY_DATA);
    if (storedData) {
      try {
        return JSON.parse(storedData) as GroceryItem[];
      } catch {
        // Fallback
      }
    }

    // Fallback to legacy status map
    const storedStatus = localStorage.getItem(STORAGE_KEY_LEGACY);
    if (storedStatus) {
      try {
        const statusMap = JSON.parse(storedStatus) as Record<string, boolean>;
        return FIXED_ITEMS.map(item => ({
          ...item,
          isAvailable: statusMap[item.id] ?? true,
        }));
      } catch {
        return FIXED_ITEMS;
      }
    }
    return FIXED_ITEMS; // default
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_ONBOARDING) === 'true';
  });

  const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEY_ONBOARDING, 'true');
    setHasCompletedOnboarding(true);
  };

  useEffect(() => {
    // Save full list to persist custom items
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(items));
    
    // Optional: Keep legacy map updated for fallback/compatibility
    const statusMap = items.reduce((acc, item) => {
      acc[item.id] = item.isAvailable;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem(STORAGE_KEY_LEGACY, JSON.stringify(statusMap));
  }, [items]);

  const toggleAvailability = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const markAsNeeded = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isAvailable: false } : item
    ));
  };

  const markAsBought = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, isAvailable: true } : item
    ));
  };
  
  const addItem = (name: string) => {
    if (!name.trim()) return;
    const newItem: GroceryItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      isAvailable: true,
    };
    setItems([newItem, ...items]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getShoppingList = () => items.filter(item => !item.isAvailable);
  const getAvailableItems = () => items.filter(item => item.isAvailable);

  return {
    items,
    toggleAvailability,
    markAsNeeded,
    markAsBought,
    addItem,
    removeItem,
    getShoppingList,
    getAvailableItems,
    hasCompletedOnboarding,
    completeOnboarding,
  };
};
