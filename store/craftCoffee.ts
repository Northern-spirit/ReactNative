import { create } from 'zustand';
import { CraftCoffeeState, CraftCoffeeOptions } from '../types/types';

const initialOptions: CraftCoffeeOptions = {
  base: 'water',
  coffeeType: '',
  syrups: [],
  additions: {
    cinnamon: false,
    sugar: false,
  },
  size: 250,
};

export const useCraftCoffee = create<CraftCoffeeState>((set) => ({
  options: initialOptions,
  setBase: (base) => set((state) => ({ 
    options: { ...state.options, base } 
  })),
  setCoffeeType: (coffeeType) => set((state) => ({ 
    options: { ...state.options, coffeeType } 
  })),
  toggleSyrup: (syrup) => set((state) => {
    const syrups = state.options.syrups.includes(syrup)
      ? state.options.syrups.filter(s => s !== syrup)
      : [...state.options.syrups, syrup];
    return { options: { ...state.options, syrups } };
  }),
  toggleAddition: (addition) => set((state) => ({
    options: {
      ...state.options,
      additions: {
        ...state.options.additions,
        [addition]: !state.options.additions[addition],
      },
    },
  })),
  setSize: (size) => set((state) => ({ 
    options: { ...state.options, size } 
  })),
  resetOptions: () => set({ options: initialOptions }),
})); 