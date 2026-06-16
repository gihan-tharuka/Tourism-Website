import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

describe("Health API", () => {
  it("GET /api/health returns 200", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.status).to.equal("ok");
  });
});
