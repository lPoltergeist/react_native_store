import { seedDatabase } from './handlers';
import { server } from './server';

beforeAll(() => server.listen());
beforeEach(() => {
  seedDatabase();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const BASE_URL = 'http://192.168.1.109:3000';

test('Must list all stores with product count', async () => {
  const response = await fetch(`${BASE_URL}/stores`);
  const stores = await response.json();

  expect(response.status).toBe(200);

  expect(stores[0].name).toBe('Loja Central');
  expect(stores[0].productCount).toBe(1);
});

test('Must create a new store with success', async () => {
  const newStore = {
    name: 'Loja Zézinho',
    address: 'Rua Secundária, 171',
  };

  const response = await fetch(`${BASE_URL}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStore),
  });

  const store = await response.json();

  expect(response.status).toBe(201);
  expect(store.id).toBeDefined();
  expect(store).toEqual({
    ...newStore,
    id: expect.any(String),
  });
});

test('Must update a store with success', async () => {
  const updatedStore = {
    name: 'Loja Zézinho',
    address: 'Rua Secundária, 171',
  };

  const response = await fetch(`${BASE_URL}/stores/1`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedStore),
  });

  const store = await response.json();

  expect(response.status).toBe(200);
  expect(store).toEqual({
    ...updatedStore,
    id: '1',
  });
});

test('Must delete a store with success', async () => {
  const response = await fetch(`${BASE_URL}/stores/1`, {
    method: 'DELETE',
  });

  expect(response.status).toBe(200);
});

test('Must list all products', async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const products = await response.json();

  expect(response.status).toBe(200);
  expect(products[0].name).toBe('Arroz 5kg');
});
