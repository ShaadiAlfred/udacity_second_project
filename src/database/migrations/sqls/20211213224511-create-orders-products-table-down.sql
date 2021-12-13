CREATE TABLE ordersProducts (
    id SERIAL PRIMARY KEY,
    productId REFERENCES "products"(id),
    quantity INTEGER,
    orderId REFERENCES "orders"(id)
);