import request from "supertest";
import { expect } from "chai";

const app = (global as any).__SERVER__;

describe("User crud", () => {
  const createUserRoute = "/api/user/signup";
  it(createUserRoute, async () => {
    const fakeUser = {
      name: "Teste fake user",
      email: "teste@teste.com",
      password: "12345678",
    };

    const response = await request(app).post(createUserRoute).send(fakeUser);
    console.log(response.body);
    expect(response.body).to.equal(204);
  });
});
