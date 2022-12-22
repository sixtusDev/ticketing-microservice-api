import request from "supertest";
import { app } from "../../app";

it("Clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app).get("/api/users/signout").expect(200);
  expect(response.get("Set-Cookie")[0]).toBe(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
