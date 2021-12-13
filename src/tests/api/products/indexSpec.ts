import app from "../../../index";
import request from "supertest";

let token: string;

const product = {
  name: "Hat",
  price: 3450,
};

describe("Test product's routes", () => {
  beforeAll((done) => {
    const user = {
      username: "johnsmith",
      firstname: "John",
      lastname: "Smith",
      password: "password",
    };

    request(app)
      .post("/api/users")
      .send(user)
      .end((_err, res) => {
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
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(product.name);
        expect(res.body.price).toBe(product.price);
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
});
