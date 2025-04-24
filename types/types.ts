export interface Review {
    id: number;
    userName: string;
    text: string;
}

export interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
    description: string;
    image: string[];
    rating: number;
    reviews: Review[];
    quantity?: number; // Опциональное поле для корзины
}
export interface CartItem extends Product {
    quantity: number;
}

export interface ProducstStoreState {
    products: Product[];
    cart: Product[];
    isLoading: boolean;
    count: number;
    addCount: (element: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    setLoading: (loading: boolean) => void;
    clearCart: () => void;
    addProduct: (product: Product) => void;
    updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
    removeProduct: (id: number) => void;
}

export type NotificationType = 'success' | 'error';

export interface Notification {
    text: string;
    type: NotificationType;
}

export interface NotificationState {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
}

export interface PromoCardItemProps {
    id: number;
    title: string;
    text: string;
    description: string;
    img: string;
    time: number;
    price: number;
}

export interface Props {
    itemCard: PromoCardItemProps;
}

export interface PromoStore {
    promoCard: PromoCardItemProps[];
    addPromoCard: (card: Omit<PromoCardItemProps, "id">) => void;
    removePromoCard: (id: number) => void;
    updatePromoCard: (id: number, card: Partial<PromoCardItemProps>) => void;
}

export interface ProductsTabProps {
    product: Product;
}