# Storefront Backend

A backend for a store.

## Installing packages

`npm install`

## .env file

Copy the `.env.example` file `cp .env.example .env` then fill out:

- the postgres credentials (make sure they are the same ones in the `docker-compose.yml` because docker creates a user with the credentials found in that yaml file upon starting)

`docker-compose.yml`

```yaml
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
```

`.env`

```console
DATABASE_DEVELOPMENT_USERNAME=postgres
DATABASE_DEVELOPMENT_PASSWORD=postgres
DATABASE_TEST_USERNAME=postgres
DATABASE_TEST_PASSWORD=postgres
DATABASE_PRODUCTION_USERNAME=postgres
DATABASE_PRODUCTION_PASSWORD=postgres
```

- jwt secret token

```console
TOKEN_SECRET=<secret-token>
```

- secret pepper, and salt rounds for bcrypt

```console
BCRYPT_PASSWORD=<secret-pepper>
SALT_ROUNDS=<number-of-salt-rounds>
```

## Starting the database

Docker creates 3 databases _automatically_ when it's run for the first time:

- Development
- Testing
- Production

Then it grants access to these databases for the user specified in the `docker-compose.yml` file. For more details check the file in `src/database/docker_init.sql` which docker runs automatically when it's run for the first time.

```postgres
-- Dev
CREATE DATABASE store_dev;
GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;

-- Testing
CREATE DATABASE store_test;
GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;

-- Production
CREATE DATABASE store;
GRANT ALL PRIVILEGES ON DATABASE store TO postgres;
```

You can start docker by running:

`docker-compose up -d`

### Database Credentials

They are set in the `docker-compose.yml` file

```yaml
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
```

And the default port is: `5432`

### Migrations

To run migrations install `db-migrate`

```console
npm install -g db-migrate
db-migrate up
```

Migration files are found in `src/database/migrations`. `database.json` is found in `src/database/config/database.json`, it reads the values from the `.env` file.

## npm scripts

- `npm run start`

Builds and starts the server on port `3000`

- `npm run watch`

Starts nodemon with ts-node support, so it updates whenever any `*.ts` file is modified

- `npm run build`

Builds the files in the `src` directory, and outputs the transpiled `JavaScript` code into the `dist` directory

- `npm run jasmine`

Runs jasmine _without building_.

- `npm run preparedb`

Prepares the testing database `store_test` by running the file `dist/database/prepareDatabaseForTesting.js` which seeds it with initial values.

- `npm run test`

It builds the project, runs the migrations on the database for testing, seeds the database, runs the jasmine test suites, then after it finishes it clears out the testing database.

- `npm run lint`

Runs eslint

- `npm run lintf`

Runs eslint and fixes any issues automatically

- `npm run prettier`

Runs prettier
