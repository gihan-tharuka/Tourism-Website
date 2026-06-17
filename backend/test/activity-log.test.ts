import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

const adminCredentials = {
  email: "admin@beyondsea.com",
  password: "Admin123!",
};

const loginWithRetry = async () => {
  let response = await request(app).post("/api/auth/login").send(adminCredentials);

  if (response.status === 503) {
    response = await request(app).post("/api/auth/login").send(adminCredentials);
  }

  return response;
};

const getAdminToken = async () => {
  const response = await loginWithRetry();

  expect(response.status).to.equal(200);

  return response.body.data.token as string;
};

describe("Activity Log API", () => {
  it("logging disabled does not break auth login", async () => {
    const originalEnabled = process.env.MONGODB_LOGGING_ENABLED;
    process.env.MONGODB_LOGGING_ENABLED = "false";

    try {
      const response = await loginWithRetry();

      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.data.token).to.be.a("string").and.not.empty;
    } finally {
      if (originalEnabled === undefined) {
        delete process.env.MONGODB_LOGGING_ENABLED;
      } else {
        process.env.MONGODB_LOGGING_ENABLED = originalEnabled;
      }
    }
  });

  it("GET /api/admin/activity-logs requires JWT", async () => {
    const response = await request(app).get("/api/admin/activity-logs").expect(401);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("Unauthorized");
  });

  it("GET /api/admin/activity-logs returns a safe response when logging is disabled", async () => {
    const originalEnabled = process.env.MONGODB_LOGGING_ENABLED;
    process.env.MONGODB_LOGGING_ENABLED = "false";

    try {
      const token = await getAdminToken();
      const response = await request(app)
        .get("/api/admin/activity-logs")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).to.equal(true);
      expect(response.body.data).to.be.an("array").and.have.length(0);
    } finally {
      if (originalEnabled === undefined) {
        delete process.env.MONGODB_LOGGING_ENABLED;
      } else {
        process.env.MONGODB_LOGGING_ENABLED = originalEnabled;
      }
    }
  });
});
