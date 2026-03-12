import { create } from 'zustand';

interface StoreStore {
  id: string;
  name: string;
  address: string;
  productCount: number;
}

interface StoreState {
  stores: StoreStore[];
  selectedStore: StoreStore | null;
  isLoading: boolean;

  fetchStores: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<StoreStore | null>;
  clearSelectedStore: () => void;
  createStore: (store: Omit<StoreStore, 'id'>) => Promise<void>;
  updateStore: (
    id: string,
    store: Partial<Omit<StoreStore, 'id'>>,
  ) => Promise<void>;
  deleteStore: (id: string) => Promise<void>;
}

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  selectedStore: null,
  isLoading: false,

  fetchStores: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('http://localhost:3000/stores');
      const stores = await response.json();
      set({ stores });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStoreById: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/stores/${id}`);
      const store = await response.json();

      set({ selectedStore: store });

      return store;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  clearSelectedStore: () => {
    set({ selectedStore: null });
  },

  createStore: async (newStore) => {
    try {
      const response = await fetch('http://localhost:3000/stores', {
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
      const response = await fetch(`http://localhost:3000/stores/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateStore),
      });

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
      await fetch(`http://localhost:3000/stores/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        stores: state.stores.filter((store) => store.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
