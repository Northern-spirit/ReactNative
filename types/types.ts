export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string[];
    rating: number;
    reviews: {
        id: number;
        userName: string;
        text: string;
    }[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ProducstStoreState {
    products: Product[];
    cart: CartItem[];
    isLoading: boolean;
    count: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    setLoading: (loading: boolean) => void;
    addCount: (element: number) => void;
    clearCart: () => void;
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
    img: string;
    title: string;
    text: string;
    time: number;
    price: number
}

export interface PromoCardProps {
    promoCard: PromoCardItemProps[];
    addPromoCard: (promoCard: PromoCardItemProps) => void;
    removePromoCard: (idPromoCard: number) => void;
}