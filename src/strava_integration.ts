// Enable skipping dotenv for Github Actions
if (process.env.DOTENV !== 'false') { require('dotenv').config() }

const stravaToken = process.env.STRAVA_TOKEN
const stravaClientID = process.env.STRAVA_CLIENT_ID

const periods = []
const clubId = 278109

console.log(stravaClientID)

// function getUserList() {
//   // TODO: get user list from strava mayIsBikeMonth
// }

// function userTotalsForPeriod(stravaId, period): Totals {

// }

export function add (x: number, y: number): number {
  return x + y
}

export function multiply (x: number, y: number): number {
  return x * y
}
