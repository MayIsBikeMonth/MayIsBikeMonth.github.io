import { type } from "os";
import * as strava from "../src/strava_integration";

describe("Math functions", () => {
  it("should multiply 5 by 3", () => {
    const result = strava.multiply(5, 3);
    expect(result).toEqual(15);
  });

  it("should add 5 by 3", () => {
    const result = strava.add(5, 3);
    expect(result).toEqual(8);
  });
});

test("makeGetRequest", async () => {
  // const result = await strava.makeGetRequest("athlete/activities", {per_page: 200});
  const result = await strava.makeGetRequest("club");
  console.log(result)
  expect(result).toEqual(8);
});

test("getUserList", async () => {
  const result = await strava.getUserList();
  // console.log(result[0])
  expect(result.length).toEqual(17);
});
