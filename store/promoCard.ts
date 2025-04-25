import { create } from 'zustand';
import { PromoStore, PromoCardItemProps } from '../types/types';
import { promoCard } from '../constants/MockData';

export const usePromoCard = create<PromoStore>((set) => ({
  promoCard: promoCard,
  addPromoCard: (card) =>
    set((state) => ({
      promoCard: [...state.promoCard, { ...card, id: Date.now() }],
    })),
  removePromoCard: (id) =>
    set((state) => ({
      promoCard: state.promoCard.filter((card) => card.id !== id),
    })),
  updatePromoCard: (id, updatedCard) =>
    set((state) => ({
      promoCard: state.promoCard.map((card) =>
        card.id === id 
          ? { 
              ...card, 
              ...updatedCard,
              img: updatedCard.img || card.img,
            } 
          : card
      ),
    })),
}));
