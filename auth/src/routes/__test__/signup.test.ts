import request from "supertest";

import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "Password123",
    })
    .expect(201);
});

it("Returns a 400 with invalid email on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail",
      password: "Password123",
    })
    .expect(400);
});

it("Returns a 400 with invalid password on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail",
      password: "pass",
    })
    .expect(400);
});

it("Returns a 400 with no email and password signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "hello@test.com" })
    .expect(400);
  await request(app).post("/api/users/signup").send({}).expect(400);
});

it("Disallows duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@test.com",
      password: "passwordd",
    })
    .expect(400);
});

it("Sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
