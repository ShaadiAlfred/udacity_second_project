import { Product, ProductStore } from "./models/Product";
import { User, UserStore } from "./models/User";

export const user: User = {
  id: 1,
  username: "johnsmith",
  firstname: "John",
  lastname: "Smith",
  password: "password",
};

export const product1: Product = {
  id: 1,
  name: "Hat",
  price: 1234,
};

export const product2: Product = {
  id: 2,
  name: "Jacket",
  price: 5200,
};

async function run() {
  try {
    await UserStore.create(user);
    console.log("Seeded user", user);

    await ProductStore.create(product1);
    console.log("Seeded product", product1);

    await ProductStore.create(product2);
    console.log("Seeded product", product2);
  } catch (error) {
    console.log(error);
  }
}

if (require.main === module) {
  run().then(() => process.exit());
}
