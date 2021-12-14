CREATE TABLE ordersProducts (
    id SERIAL PRIMARY KEY,
    productId BIGINT REFERENCES "products"(id),
    quantity INTEGER,
    orderId BIGINT REFERENCES "orders"(id)
);