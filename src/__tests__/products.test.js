import request from 'supertest';
import app from '../index.mjs';

describe('GET /api/v1/logs', () => {
  it('should return logs', async () => {
    const res = await request(app).get('/api/v1/logs');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// describe('Product Routes', () => {
//   it('GET /api/v1/products should return all products', async () => {
//     const res = await request(app).get('/api/v1/products');
//     expect(res.statusCode).toEqual(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('GET /api/v1/products/:id should return a specific product', async () => {
//     const res = await request(app).get('/api/v1/products/1');
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('id', 1);
//   });

//   it('POST /api/v1/products should add a new product', async () => {
//     const newProduct = {
//       productName: 'Test Product',
//       price: 100,
//       quantityAvailable: 10
//     };
//     const res = await request(app).post('/api/v1/products').send(newProduct);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toContainEqual(expect.objectContaining(newProduct));
//   });

  // Add more tests for PUT, PATCH, DELETE routes
// });
