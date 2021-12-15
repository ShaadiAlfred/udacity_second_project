CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    -- Price in cents
    price INTEGER NOT NULL
);