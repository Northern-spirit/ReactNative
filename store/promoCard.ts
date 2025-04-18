import { create } from 'zustand';
import { PromoCardProps} from '../types/types'
import { promoCard } from '../constants/MockData'

export const usePromoCard = create<PromoCardProps>((set) => ({
    promoCard: promoCard,
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
