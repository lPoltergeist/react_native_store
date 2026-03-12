import { http, HttpResponse } from 'msw';

interface Product {
  id: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
}

interface Store {
  id: string;
  name: string;
  address: string;
}

const INITIAL_STORES = [
  { id: '1', name: 'Loja Central', address: 'Rua Principal, 100' },
];

const INITIAL_PRODUCTS = [
  {
    id: '101',
    storeId: '1',
    name: 'Arroz 5kg',
    category: 'Alimentos',
    price: 25.5,
  },
];

// Reatribua as variáveis com os valores iniciais
export let stores = [...INITIAL_STORES];
export let products = [...INITIAL_PRODUCTS];

// Adicione esta função para resetar
export const seedDatabase = () => {
  stores = [...INITIAL_STORES];
  products = [...INITIAL_PRODUCTS];
};

const BASE_URL = 'http://localhost:3000';

export const handlers = [
  //Store
  http.get(`${BASE_URL}/stores`, () => {
    const storesWithCount = stores.map((store) => ({
      ...store,
      productCount: products.filter((product) => product.storeId === store.id)
        .length,
    }));
    return HttpResponse.json(storesWithCount);
  }),

  http.get(`${BASE_URL}/stores/:id`, ({ params }) => {
    const { id } = params;
    const store = stores.find((s) => s.id === id);
    if (!store) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json(store, { status: 200 });
  }),

  http.post(`${BASE_URL}/stores`, async ({ request }) => {
    const newStore = (await request.json()) as Omit<Store, 'id'>;

    if (!newStore.name || !newStore.address) {
      return new HttpResponse('Invalid store name or address', { status: 400 });
    }

    const store = {
      id: Math.random().toString(36).substring(2, 9),
      ...newStore,
    };
    stores.push(store);
    return HttpResponse.json(store, { status: 201 });
  }),

  http.patch(`${BASE_URL}/stores/:id`, async ({ request, params }) => {
    const { id } = params;
    const updatedStore = (await request.json()) as Partial<Omit<Store, 'id'>>;

    if (!updatedStore.name || !updatedStore.address) {
      return new HttpResponse('Invalid store name or address', { status: 400 });
    }

    const storeIndex = stores.findIndex((s) => s.id === id);
    if (storeIndex === -1)
      return new HttpResponse('Store not found', { status: 404 });

    const updated = { ...stores[storeIndex], ...updatedStore };

    stores = stores.map((s) => (s.id === id ? updated : s));
    return HttpResponse.json(updated, { status: 200 });
  }),

  http.delete(`${BASE_URL}/stores/:id`, async ({ params }) => {
    const { id } = params;
    if (!id) return HttpResponse.json('Store not found', { status: 404 });
    stores = stores.filter((store) => store.id !== id);
    products = products.filter((product) => product.storeId !== id);
    return HttpResponse.json(id, { status: 200 });
  }),

  //Product
  http.get(`${BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const storeId = url.searchParams.get('storeId');

    const totalProducts = storeId
      ? products.filter((p) => p.storeId === storeId)
      : products;

    console.log('totalProducts', totalProducts);

    return HttpResponse.json(totalProducts, { status: 200 });
  }),

  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const newProduct = (await request.json()) as Omit<Product, 'id'>;

    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      return new HttpResponse('Invalid product name, category or price', {
        status: 400,
      });
    }

    const product = {
      id: Math.random().toString(36).substring(2, 9),
      ...newProduct,
    };
    products.push(product);
    return HttpResponse.json(product, { status: 201 });
  }),

  http.patch(`${BASE_URL}/products/:id`, async ({ request, params }) => {
    const { id } = params;
    const updateProduct = (await request.json()) as Partial<Product>;

    if (
      !updateProduct.name ||
      !updateProduct.category ||
      !updateProduct.price
    ) {
      return new HttpResponse('Invalid product name, category or price', {
        status: 400,
      });
    }

    const product = products.find((p) => p.id === id);
    if (!product) return new HttpResponse('Product not found', { status: 404 });

    products = products.map((s) =>
      s.id === id ? { ...s, ...updateProduct } : s,
    );
    return HttpResponse.json(product, { status: 200 });
  }),

  http.delete(`${BASE_URL}/products/:id`, async ({ params }) => {
    const { id } = params;
    if (!id) return HttpResponse.json('Product not found', { status: 404 });

    products = products.filter((product) => product.id !== id);
    return HttpResponse.json(id, { status: 200 });
  }),
];
