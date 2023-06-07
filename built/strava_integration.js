"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = exports.add = void 0;
// Enable skipping dotenv for Github Actions
if (process.env.DOTENV !== 'false') {
    require('dotenv').config();
}
const stravaToken = process.env.STRAVA_TOKEN;
const stravaClientID = process.env.STRAVA_CLIENT_ID;
const periods = [];
const clubId = 278109;
console.log(stravaClientID);
// function getUserList() {
//   // TODO: get user list from strava mayIsBikeMonth
// }
// function userTotalsForPeriod(stravaId, period): Totals {
// }
function add(x, y) {
    return x + y;
}
exports.add = add;
function multiply(x, y) {
    return x * y;
}
exports.multiply = multiply;
