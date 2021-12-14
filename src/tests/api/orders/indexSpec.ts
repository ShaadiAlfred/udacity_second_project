import app from "../../../index";
import request from "supertest";
import { product1, product2, user } from "../../../database/prepareDatabaseForTesting";

describe("test orders routes", async () => {
  let token: string;

  beforeAll((done) => {
    request(app)
      .post("/api/users/login")
      .send({ username: user.username, password: user.password })
      .end((_err, res) => {
        token = res.body.token;
        done();
      });
  });

  it("should create a new order POST /api/orders", (done) => {
    request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer " + token)
      .send({
        products: [
          {
            id: product1.id,
            quantity: 3,
          },
          {
            id: product2.id,
            quantity: 4,
          },
        ],
      })
      .expect(200)
      .end((_err, res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.status).toBe("active");
        expect(res.body.userid).toBeDefined();

        done();
      });
  });
});
