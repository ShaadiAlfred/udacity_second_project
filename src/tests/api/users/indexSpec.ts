import app from "../../../index";
import request from "supertest";

describe("Test users routes", () => {
  it("POST /api/users should create a user", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        password: "password",
      })
      .expect(200)
      .end((_err, res) => {
        expect(res.body.token).toBeDefined();
        done();
      });
  });

  it("should fail because same username", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        password: "password",
      })
      .expect(400)
      .end((_err, res) => {
        expect(res.body.message).toBe("Username already used");
        done();
      });
  });

  it("should fail because missing username", (done) => {
    request(app)
      .post("/api/users")
      .send({
        firstName: "John",
        lastName: "Doe",
        password: "password",
      })
      .expect(400)
      .end((_err, res) => {
        expect(res.body.message).toBe("Missing parameters");

        done();
      });
  });

  it("should fail because username is empty string", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "",
        firstName: "John",
        lastName: "Doe",
        password: "password",
      })
      .expect(400)
      .end((_err, res) => {
        expect(res.body.message).toBe("Parameters cannot be empty string");

        done();
      });
  });
});
