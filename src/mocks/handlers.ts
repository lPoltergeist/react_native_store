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

const BASE_URL = 'http://192.168.1.109:3000';

export const handlers = [
  //Store
  http.get(`${BASE_URL}/stores`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = 10;

    const start = (page - 1) * limit;
    const end = page * limit;

    const paginatedStores = stores.slice(start, end);

    const storesWithCount = paginatedStores.map((store) => ({
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
    const updateData = (await request.json()) as Partial<Store>;

    const storeIndex = stores.findIndex((s) => s.id === id);
    if (storeIndex === -1) {
      return new HttpResponse('Store not found', { status: 404 });
    }


    const updatedStore = {
      ...stores[storeIndex],
      ...updateData
    };

    stores[storeIndex] = updatedStore;

    return HttpResponse.json(updatedStore, { status: 200 });
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
    const page = Number(url.searchParams.get('page') || '1');
    const limit = 10;

    let filteredProducts = products;
    if (storeId) {
      filteredProducts = products.filter((p) => p.storeId === storeId);
    }

    const start = (page - 1) * limit;
    const end = page * limit;
    const paginatedProducts = filteredProducts.slice(start, end);

    return HttpResponse.json(paginatedProducts, { status: 200 });
  }),

  http.post(`${BASE_URL}/products`, async ({ request }) => {
    const newProduct = (await request.json()) as Omit<Product, 'id'>;

    console.log(newProduct);
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
    return HttpResponse.json(updateProduct, { status: 200 });
  }),

  http.delete(`${BASE_URL}/products/:id`, async ({ params }) => {
    const { id } = params;
    if (!id) return HttpResponse.json('Product not found', { status: 404 });

    products = products.filter((product) => product.id !== id);
    return HttpResponse.json(id, { status: 200 });
  }),
];
