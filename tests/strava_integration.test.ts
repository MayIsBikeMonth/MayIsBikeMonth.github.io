import { type } from "os";
import * as strava from "../src/strava_integration";

// test("authorizeToken", async () => {
//   const result = await strava.authorizeToken("XXXX");
//   console.log(result)
//   expect(result).toEqual(8);
// });

// test("makeGetRequest", async () => {
//   // const result = await strava.makeGetRequest("athlete/activities", {per_page: 200});
//   const result = await strava.makeGetRequest("club");
//   console.log(result)
//   expect(result).toEqual(8);
// });

// test("getUserList", async () => {
//   const result = await strava.getUserList();
//   console.log(result)
//   const rArray = Array.from(result)
//   // console.log(rArray[0])
//   expect(rArray.length).toEqual(17);
// });

test("getClubActivities", async () => {
  const result = await strava.getClubActivities();
  console.log(result)
  expect(result).toEqual(17);
});
