import { create } from 'zustand';
import { userData } from '../constants/MockData';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  users: User[];
  setAll: (data: any) => void;
  addUser: (user: User) => void;
  updateUser: (id: number, data: Partial<Omit<User, 'id'>>) => void;
  removeUser: (id: number) => void;
}

export const useUser = create<UserState>((set) => ({
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  password: userData.password,
  users: [
    {
      id: 0,
      firstName: 'Александр',
      lastName: 'Грехов',
      email: 'btld_grekhov@mail.com',
      password: '123456',
    },
  ],
  setAll: (data) => set(() => ({ ...data })),
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      ),
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));