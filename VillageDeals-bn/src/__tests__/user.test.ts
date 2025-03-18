import request from "supertest";
import app from "../app";

describe("/health-check", () => {
  it("should return a 200 status and a welcome message", async () => {
    const response = await request(app).get("/health-check");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "Welcome to village deals api",
    });
  });
});
