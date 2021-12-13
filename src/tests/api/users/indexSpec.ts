import app from "../../../index";
import request from "supertest";

let token: string;

const user1 = {
  id: 1,
  username: "johndoe",
  firstname: "John",
  lastname: "Doe",
};

describe("Test users routes", () => {
  it("POST /api/users should create a user", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "johndoe",
        firstname: "John",
        lastname: "Doe",
        password: "password",
      })
      .expect(200)
      .end((_err, res) => {
        expect(res.body.token).toBeDefined();

        token = res.body.token;

        done();
      });
  });

  it("should fail because same username", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "johndoe",
        firstname: "John",
        lastname: "Doe",
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
        firstname: "John",
        lastname: "Doe",
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
        firstname: "John",
        lastname: "Doe",
        password: "password",
      })
      .expect(400)
      .end((_err, res) => {
        expect(res.body.message).toBe("Parameters cannot be empty string");

        done();
      });
  });

  it("should return all users GET /api/users", (done) => {
    request(app)
      .get("/api/users")
      .expect(200)
      .set("Authorization", "Bearer " + token)
      .end((_err, res) => {
        expect(res.body).toEqual([user1]);
        done();
      });
  });

  describe("Tests GET /api/users/:id", () => {
    it("should fail because token is missing", (done) => {
      request(app)
        .get("/api/users/1")
        .expect(401)
        .end((_err, res) => {
          expect(res.body.message).toBe("Authentication failed");
          done();
        });
    });

    it("should return the first user", (done) => {
      request(app)
        .get("/api/users/1")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .end(async (_err, res) => {
          expect(res.body).toEqual({ id: 1, username: "johndoe", firstname: "John", lastname: "Doe" });
          done();
        });
    });
  });

  describe("Test login route POST /api/users/login", () => {
    it("should log in and get a token", (done) => {
      request(app)
        .post("/api/users/login")
        .send({
          username: user1.username,
          password: "password",
        })
        .expect(200)
        .end((_err, res) => {
          expect(res.body.token).toBeDefined();
          done();
        });
    });
  });
});
