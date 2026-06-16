import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

describe("Transfers API", () => {
  it("GET /api/transfers/estimate returns estimated price and vehicle", async () => {
    const response = await request(app)
      .get("/api/transfers/estimate")
      .query({ pickup: "colombo", dropoff: "galle", passengers: 4 })
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.estimatedPrice).to.be.a("number").and.greaterThan(0);
    expect(response.body.data.recommendedVehicle).to.equal("SUV");
  });
});
