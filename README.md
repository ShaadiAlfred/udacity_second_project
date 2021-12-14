# Storefront Backend

A backend for a store.

## Installing packages

`npm install`

## Starting the database

Docker creates 3 databases when it's run for the first time:

- Development
- Testing
- Production

You can start docker by running:

`docker-compose up -d`

## .env file

Copy the `.env.example` file `cp .env.example .env` then fill out the postgres credentials (the ones in the `docker-compose.yml`) and add your secret pepper, and salt rounds.

### Database Credentials

They are set in the `docker-compose.yml` file

```yaml
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
```

And the default port is: `5432`

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
