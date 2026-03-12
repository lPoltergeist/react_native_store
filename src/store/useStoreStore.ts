import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Store } from '../interfaces/store';

interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  setSelectedStore: (store: Store) => void;
  isLoading: boolean;

  fetchStores: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<Store | null>;
  clearSelectedStore: () => void;
  createStore: (store: Omit<Store, 'id'>) => Promise<void>;
  updateStore: (
    id: string,
    store: Partial<Omit<Store, 'id'>>,
  ) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
}

const BASE_URL = 'http://192.168.1.109:3000'

export const useStoreStore = create<StoreState>()(
  persist(
    (set) => ({
      stores: [] as Store[],
      selectedStore: null as Store | null,
      isLoading: false,

      fetchStores: async (page = 1) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/stores?page=${page}&limit=10`);
          const stores = await response.json();
          set((state) => ({
            stores: page === 1 ? stores : [...state.stores, ...stores],
            isLoading: false
          }));
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchStoreById: async (id) => {
        try {
          const response = await fetch(`${BASE_URL}/stores/${id}`);
          const store = await response.json();

          set({ selectedStore: store });

          return store;
        } catch (error) {
          console.error(error);
          return null;
        }
      },

      setSelectedStore: (store) => {
        set({ selectedStore: store });
      },

      clearSelectedStore: () => {
        set({ selectedStore: null });
      },

      createStore: async (newStore) => {
        try {
          const response = await fetch(`${BASE_URL}/stores`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStore),
          });

          const createdStore = await response.json();
          set((state) => ({
            stores: [...state.stores, createdStore],
          }));
        } catch (error) {
          console.error(error);
        }
      },

      updateStore: async (id, updateStore) => {
        try {
          const response = await fetch(`${BASE_URL}/stores/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateStore),
          });

          console.log('updatedStore', response, id);

          const updatedStore = await response.json();

          set((state) => ({
            stores: state.stores.map((store) =>
              store.id === id ? updatedStore : store,
            ),
          }));
        } catch (error) {
          console.error(error);
        }
      },

      deleteStore: async (id) => {
        try {
          await fetch(`${BASE_URL}/stores/${id}`, {
            method: 'DELETE',
          });
          set((state) => ({
            stores: state.stores.filter((store) => store.id !== id),
          }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: 'store-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
