CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(id) REFERENCES users(id),
    "status" VARCHAR(8) CHECK ("status" IN ('active', 'complete'))
);