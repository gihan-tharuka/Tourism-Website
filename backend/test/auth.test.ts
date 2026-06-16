import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

const adminCredentials = {
  email: "admin@beyondsea.com",
  password: "Admin123!",
};

describe("Auth API", () => {
  it("POST /api/auth/login rejects invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: adminCredentials.email, password: "wrong-password" })
      .expect(401);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("Invalid email or password");
  });

  it("POST /api/auth/login accepts valid admin credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(adminCredentials)
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.token).to.be.a("string").and.not.empty;
    expect(response.body.data.user.email).to.equal(adminCredentials.email);
    expect(response.body.data.user.role).to.equal("ADMIN");
  });
});
