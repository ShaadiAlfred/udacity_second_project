-- Dev

CREATE DATABASE store_dev;
GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;

-- Testing

CREATE DATABASE store_test;
GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;

-- Production

CREATE DATABASE store;
GRANT ALL PRIVILEGES ON DATABASE store TO postgres;

