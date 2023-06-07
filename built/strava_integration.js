"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserList = exports.makeGetRequest = void 0;
// Enable skipping dotenv for Github Actions
if (process.env.DOTENV !== 'false') {
    require('dotenv').config();
}
const stravaToken = process.env.STRAVA_TOKEN;
const stravaClientID = process.env.STRAVA_CLIENT_ID;
const periods = [];
const clubId = 278109; // No longer super relevant
const countedSportTypes = [
    // 'EBikeRide',
    // 'EMountainBikeRide',
    'GravelRide',
    'MountainBikeRide',
    'Ride',
    'VirtualRide',
    'Velomobile',
    'Wheelchair',
    'Handcycle'
];
// Useful things from the strava API docs:
// resource_state: indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail"
// moving_time: The activity's moving time, in seconds (if )
// start_date_local: The activity's start date, in "Local" format
// distance: The activity's distance, in meters
// total_elevation_gain: The activity's total elevation gain, in meters
// sport_type: instance of SportType
function makeGetRequest(endpoint, args = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (endpoint === 'club') {
            endpoint = `clubs/${clubId}`;
        }
        const response = yield fetch(`https://www.strava.com/api/v3/${endpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${stravaToken}`
            }
        });
        // .catch((e) => {
        //     if (e.response && e.response.headers) {
        //       limits = rateLimiting.updateRateLimits(e.response.headers)
        //     }
        //     return Promise.reject(e)
        //   })
        const jsonData = yield response.json();
        return jsonData;
    });
}
exports.makeGetRequest = makeGetRequest;
function getUserList() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `clubs/${clubId}/members`;
        const args = { per_page: 200 };
        const result = yield makeGetRequest(endpoint, args);
        return result;
    });
}
exports.getUserList = getUserList;
// function userTotalsForPeriod(stravaId, period): Totals {
// }
