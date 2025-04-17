import { create } from 'zustand';

interface PromoCardItemProps {
    id: number;
    img: string;
    title: string;
    text: string;
}

interface PromoCardProps {
    promoCard: PromoCardItemProps[];
    addPromoCard: (promoCard: PromoCardItemProps) => void;
    removePromoCard: (idPromoCard: number) => void;
}

export const usePromoCard = create<PromoCardProps>((set, get) => ({
    promoCard: [],
    addPromoCard: (promoCard) => {
        set((state) => ({
            promoCard: [...state.promoCard, promoCard],
        }));
    },
    removePromoCard: (idPromoCard: number) => {
        set((state) => ({
            promoCard: state.promoCard.filter((promoCardItem) => promoCardItem.id !== idPromoCard),
        }));
    }
}));
