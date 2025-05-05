import { create } from 'zustand';
import { ProducstStoreState, CartItem, Product } from '../types/types';
import { products } from '../constants/MockData'

interface StoreState {
    products: typeof products;
    cart: CartItem[];
    isLoading: boolean;
    count: number;
    addCount: (element: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    setLoading: (loading: boolean) => void;
    clearCart: () => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    removeProduct: (id: string) => void;
    isBrewing: boolean;
    setIsBrewing: (isBrewing: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    products: products,
    cart: [],
    isLoading: false,
    count: 0,
    addCount: (element) =>
        set((state) => ({
            count: state.count + element,
        })),
    addToCart: (product: Product) =>
        set((state) => {
            const existingItem = state.cart.find(
                (item) => item.id === product.id && item.type === product.type
            );

            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id && item.type === product.type
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                    ),
                };
            }

            const newCartItem: CartItem = {
                ...product,
                quantity: 1,
            };
            return { 
                cart: [...state.cart, newCartItem]
            };
        }),
    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== Number(productId)),
        })),
    updateQuantity: (productId, quantity) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === Number(productId) ? { ...item, quantity } : item
            ),
        })),
    setLoading: (loading) => set({ isLoading: loading }),
    clearCart: () => set({ cart: [] }),
    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),
    updateProduct: (id, updatedProduct) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === Number(id) ? { ...product, ...updatedProduct } : product
            ),
        })),
    removeProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== Number(id)),
        })),
    isBrewing: false,
    setIsBrewing: (isBrewing) => set({ isBrewing }),
}));