import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

describe("Tours API", () => {
  it("GET /api/tours returns success", async () => {
    const response = await request(app).get("/api/tours").expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.be.an("array");
    expect(response.body.data.length).to.be.greaterThan(0);
  });

  it("GET /api/tours/:slug returns one tour", async () => {
    const toursResponse = await request(app).get("/api/tours").expect(200);
    const [tour] = toursResponse.body.data;

    expect(tour.slug).to.be.a("string").and.not.empty;

    const response = await request(app).get(`/api/tours/${tour.slug}`).expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.slug).to.equal(tour.slug);
    expect(response.body.data.images).to.be.an("array");
    expect(response.body.data.itineraryDays).to.be.an("array");
  });
});
