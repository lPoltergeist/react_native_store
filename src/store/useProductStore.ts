import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '../interfaces/product';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  isLoading: boolean;

  fetchProducts: (id: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  clearSelectedProduct: () => void;
  createProduct: (store: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (
    id: string,
    store: Partial<Omit<Product, 'id'>>,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsCountByStore: (storeId: string) => number;
}

const BASE_URL = 'http://192.168.1.109:3000';

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [] as Product[],
      selectedProduct: null as Product | null,
      isLoading: false,

      fetchProducts: async (storeId: string, page = 1) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            `${BASE_URL}/products?storeId=${storeId}&page=${page}&limit=10`,
          );
          const products = await response.json();
          set((state) => ({
            products: page === 1 ? products : [...state.products, ...products],
            isLoading: false,
          }));
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchProductById: async (id) => {
        try {
          const response = await fetch(`${BASE_URL}/${id}`);
          const product = await response.json();

          set({ selectedProduct: product });

          return product;
        } catch (error) {
          console.error(error);
          return null;
        }
      },

      setSelectedProduct: (product: Product) => {
        set({ selectedProduct: product });
      },

      clearSelectedProduct: () => {
        set({ selectedProduct: null });
      },

      createProduct: async (newProduct: Omit<Product, 'id'>) => {
        try {
          const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
          });

          const createdProduct = await response.json();
          set((state) => ({
            products: [...state.products, createdProduct],
          }));
        } catch (error) {
          console.error(error);
        }
      },

      updateProduct: async (id, updateProduct) => {
        try {
          const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateProduct),
          });

          const updatedProduct = await response.json();
          console.log('updatedProduct', updatedProduct);
          set((state) => ({
            products: state.products.map((store) =>
              store.id === id ? updatedProduct : store,
            ),
          }));
        } catch (error) {
          console.error('Error on update product', error);
        }
      },

      deleteProduct: async (id) => {
        try {
          await fetch(`${BASE_URL}/products/${id}`, {
            method: 'DELETE',
          });
          set((state) => ({
            products: state.products.filter((store) => store.id !== id),
          }));
        } catch (error) {
          console.error(error);
        }
      },
      getProductsCountByStore: (storeId: string) => {
        return get().products.filter((p) => p.storeId === storeId).length;
      },
    }),

    {
      name: 'product-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
