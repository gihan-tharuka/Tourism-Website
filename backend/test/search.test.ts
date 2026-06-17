import { expect } from "chai";
import request from "supertest";
import app from "../src/app";

describe("Search API", () => {
  it("GET /api/search/tours?q=sri returns tour results", async () => {
    const response = await request(app).get("/api/search/tours").query({ q: "sri" }).expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.query).to.equal("sri");
    expect(response.body.data.results).to.be.an("array");
    expect(response.body.data.results.length).to.be.greaterThan(0);
  });

  it("GET /api/search/tours?q=beach returns a valid search response", async () => {
    const response = await request(app)
      .get("/api/search/tours")
      .query({ q: "beach", limit: 5 })
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.query).to.equal("beach");
    expect(response.body.data.results).to.be.an("array");
    expect(response.body.data.results.length).to.be.at.most(5);
  });

  it("GET /api/search/destinations?q=ella returns destination results", async () => {
    const response = await request(app)
      .get("/api/search/destinations")
      .query({ q: "ella" })
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.query).to.equal("ella");
    expect(response.body.data.results).to.be.an("array");
    expect(response.body.data.results.length).to.be.greaterThan(0);
  });

  it("GET /api/search/global?q=safari returns grouped results", async () => {
    const response = await request(app)
      .get("/api/search/global")
      .query({ q: "safari" })
      .expect(200);

    expect(response.body.success).to.equal(true);
    expect(response.body.data.query).to.equal("safari");
    expect(response.body.data.tours).to.be.an("array");
    expect(response.body.data.destinations).to.be.an("array");
  });

  it("GET /api/search/tours without q returns 400", async () => {
    const response = await request(app).get("/api/search/tours").expect(400);

    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.be.a("string").and.not.empty;
  });
});
