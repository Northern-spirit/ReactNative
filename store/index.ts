import { create } from 'zustand';

interface Product {
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

interface CartItem extends Product {
    quantity: number;
}

interface StoreState {
    products: Product[];
    cart: CartItem[];
    isLoading: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    products: [
        {
            id: 1,
            name: 'Эспрессо',
            price: 150,
            description: 'Крепкий черный кофе, приготовленный под высоким давлением. Идеален для настоящих ценителей насыщенного вкуса.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632844fbad60f7d3dc2a7180_Polyakovfoto_Simple%20Coffee17793%202-p-800.jpg','https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632844fbad60f7d3dc2a7180_Polyakovfoto_Simple%20Coffee17793%202-p-800.jpg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 2,
            name: 'Капучино',
            price: 180,
            description: 'Нежный кофе с молочной пенкой и слоем взбитого молока. Идеальный баланс кофе и молока.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632845fd4a30f55ce6011c1d_Polyakovfoto_Simple%20Coffee17803.jpg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 3,
            name: 'Американо',
            price: 130,
            description: 'Разбавленный эспрессо с добавлением горячей воды. Мягкий вкус с долгим послевкусием.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/608fd6042da2fc40bdeaa74c_black1-p-800.jpeg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 4,
            name: 'Латте',
            price: 200,
            description: 'Кофе с большим количеством вспененного молока и нежной текстурой. Утонченный вкус для любителей мягких напитков.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632846cae4afaaf461ad8657_Polyakovfoto_Simple%20Coffee17782-p-800.jpg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 5,
            name: 'Фраппе',
            price: 220,
            description: 'Холодный кофе, взбитый со льдом и сахаром. Освежающий напиток для жарких дней.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632f1db76a137188c11ef861_cacaovddd-p-800.jpg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 6,
            name: 'Глясе',
            price: 210,
            description: 'Кофе с шариком ванильного мороженого и шоколадной стружкой. Десертный вариант для сладкоежек.',
            image: ['https://avatars.dzeninfra.ru/get-zen_doc/3614639/pub_60c71c71123d127494fa1539_60c71c837c47271203687fd1/scale_2400'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 7,
            name: 'Кофе с молоком',
            price: 160,
            description: 'Классический вариант с добавлением горячего молока. Простой и комфортный вкус для каждого.',
            image: ['https://images.gastronom.ru/Ew3yF2XwAVl_Am1fIhPfI23dSbEuPrTJgBBPomgZq8Y/pr:article-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzM0OGVjNWVhLTgwODktNGNmMi1hNDY2LWMxZjU5MDczNDAyMy5qcGc.webp'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 8,
            name: 'Кофе со льдом',
            price: 170,
            description: 'Охлажденный эспрессо с кубиками льда и карамельным сиропом. Бодрящий напиток для летнего дня.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/609008308e7a077ea96ba930_cold1-p-800.jpeg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 9,
            name: 'Кофе по-ирландски',
            price: 250,
            description: 'Ароматный кофе с добавлением виски и взбитых сливок. Напиток с характером для особых моментов.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/608fd1df6c9455749dd7887d_coctail1-p-800.jpeg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        },
        {
            id: 10,
            name: 'Мокка',
            price: 230,
            description: 'Кофе с шоколадным сиропом, молоком и взбитыми сливками. Изысканный выбор для ценителей сладких напитков.',
            image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63340de4ebba5bc95270dd9d_Polyakovfoto_Simple%20Coffee178071-p-800.jpg'],
            rating: 4,
            reviews: [
                { id: 1, userName: 'User1', text: 'Great product!' },
                { id: 2, userName: 'User2', text: 'Very good quality' },
                { id: 3, userName: 'User3', text: 'Fast delivery' }
            ]
        }
    ],
    cart: [],
    isLoading: false,
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