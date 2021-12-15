CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    "userId" BIGINT REFERENCES users(id),
    "status" VARCHAR(8) CHECK ("status" IN ('active', 'complete'))
);