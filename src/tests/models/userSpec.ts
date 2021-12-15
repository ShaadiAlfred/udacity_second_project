import { User, UserStore } from "../../database/models/User";

describe("Test User model", () => {
  let user: User;

  it("Should create a user", async () => {
    const userData = { username: "paulatreides", firstname: "Paul", lastname: "Atreides", password: "password" };
    user = await UserStore.create(userData);

    expect(user.id).toBeDefined();
    expect(user.username).toBe(userData.username);
    expect(user.firstname).toBe(userData.firstname);
    expect(user.lastname).toBe(userData.lastname);
    expect(user.password).toBeDefined();
  });

  it("Should find user by id", async () => {
    expect(await UserStore.find(user.id as number)).toEqual(user);
  });

  it("Should find user by username", async () => {
    expect(await UserStore.find(user.username as string)).toEqual(user);
  });

  it("Should return all saved users", async () => {
    const users = await UserStore.index();

    expect(users !== undefined).toBeTrue();

    expect(users).toBeInstanceOf(Array);
    expect((users as User[]).length).toBeGreaterThan(0);

    const foundUser = (users as User[]).find((u) => u.id === user.id);

    expect(foundUser).toBeDefined();
  });

  it("Should return the authenticated user", async () => {
    const authUser = await UserStore.authenticate(user.username, user.password);

    expect(authUser !== undefined).toBeTrue();

    if (authUser === null) return;

    expect(authUser.id).toEqual(user.id);
    expect(authUser.username).toEqual(user.username);
    expect(authUser.firstname).toEqual(user.firstname);
    expect(authUser.lastname).toEqual(user.lastname);
  });
});
