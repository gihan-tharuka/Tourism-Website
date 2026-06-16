import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

const adminCredentials = {
  email: "admin@beyondsea.com",
  password: "Admin123!",
};

const getAdminToken = async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(adminCredentials)
    .expect(200);

  return response.body.data.token as string;
};

describe("Inquiries API", () => {
  it("GET /api/inquiries rejects missing JWT", async () => {
    const response = await request(app).get("/api/inquiries").expect(401);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("Unauthorized");
  });

  it("GET /api/inquiries accepts valid JWT", async () => {
    const token = await getAdminToken();

    const response = await request(app)
      .get("/api/inquiries")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.contact).to.be.an("array");
    expect(response.body.data.tour).to.be.an("array");
    expect(response.body.data.customTour).to.be.an("array");
    expect(response.body.data.transfer).to.be.an("array");
    expect(response.body.data.counts.total).to.be.a("number");
  });

  it("POST /api/inquiries/contact validates required fields", async () => {
    const response = await request(app)
      .post("/api/inquiries/contact")
      .send({ email: "guest@example.com" })
      .expect(400);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.be.a("string").and.not.empty;
  });
});
