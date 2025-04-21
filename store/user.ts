import { create } from 'zustand';
import { userData } from '../constants/MockData';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  updateUser: (data: Partial<Omit<UserState, 'updateUser'>>) => void;
}

export const useUser = create<UserState>((set) => ({
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  updateUser: (data) => set((state) => ({ ...state, ...data })),
})); 