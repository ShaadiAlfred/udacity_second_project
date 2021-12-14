# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

**Authentication is through `Authorization` header with `Bearer <token>`**

#### Products

- Index

  `GET /api/products`

- Show

  `GET /api/products/:id`

- Create [token required]

  `POST /api/products`

  Request body:

  ```typescript
  {
    "name": string,
    "price": number
    // prices are integers, in cents
  }
  ```

- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]

  `GET /api/users`

- Show [token required]

  `GET /api/users/:id`

  Or

  `GET /api/users/:username`

- Create N[token required]

  `POST /api/users`

  Request body:

  ```typescript
      {
          "username": string,
          // username must be unique
          "firstname": string,
          "lastname": string,
          "password": string
      }
  ```

#### Orders

- Current Order by user (args: user id)[token required]

  `GET /api/order/current/:userId`

- Create order

  `POST /api/orders`

  Request body:

  ```typescript
  {
      products: [
        {
          id: number,
          quantity: number,
        },
        ...
      ],
  }
  ```

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema
![image](https://user-images.githubusercontent.com/3685582/146075851-c28d8710-c8bc-4fb7-a597-889a09b620b2.png)

