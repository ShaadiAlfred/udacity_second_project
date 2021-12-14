import app from "../../../index";
import request from "supertest";
import { user } from "../../../database/prepareDatabaseForTesting";
import { Product } from "../../../database/models/Product";

describe("Test product's routes", () => {
  let token: string;

  const product: Product = {
    id: 3,
    name: "Pants",
    price: 5099,
  };

  beforeAll((done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: user.username, password: user.password })
      .then((res) => {
        token = res.body.token;
        done();
      });
  });

  it("should create a product POST /api/products", (done) => {
    request(app)
      .post("/api/products")
      .set("Authorization", "Bearer " + token)
      .send(product)
      .expect(200)
      .end((_err, res) => {
        expect(res.body.id).toEqual(product.id);
        expect(res.body.name).toEqual(product.name);
        expect(res.body.price).toEqual(product.price);
        done();
      });
  });

  it("should fail because lacks a token POST /api/products", (done) => {
    request(app)
      .post("/api/products")
      .send(product)
      .expect(401)
      .end((_err, res) => {
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toBe("Authentication failed");
        done();
      });
  });

  it("should return products GET /api/products", (done) => {
    request(app)
      .get("/api/products")
      .expect(200)
      .end((_err, res) => {
        expect(res.body[0].id).toBeDefined();
        expect(res.body[0].name).toBeDefined();
        expect(res.body[0].price).toBeDefined();
        done();
      });
  });

  it("should return the product by id GET /api/products/:id", (done) => {
    request(app)
      .get("/api/products/1")
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBeDefined();
        expect(res.body.price).toBeDefined();
        done();
      });
  });
});
