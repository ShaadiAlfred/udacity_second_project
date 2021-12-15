CREATE TABLE ordersProducts (
    id SERIAL PRIMARY KEY,
    productId BIGINT REFERENCES "products"(id) NOT NULL,
    quantity INTEGER NOT NULL,
    orderId BIGINT REFERENCES "orders"(id) NOT NULL
);