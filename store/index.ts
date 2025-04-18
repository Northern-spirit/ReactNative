import { create } from 'zustand';
import { ProducstStoreState } from '../types/types';
import { products } from '../constants/MockData'

export const useStore = create<ProducstStoreState>((set) => ({
    products: products,
    cart: [],
    isLoading: false,
    count: 0,
    addCount: (element) =>
        set((state) => ({
            count: state.count + element,
        })),
    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
        })),
    updateQuantity: (productId, quantity) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            ),
        })),
    setLoading: (loading) => set({ isLoading: loading }),
}));