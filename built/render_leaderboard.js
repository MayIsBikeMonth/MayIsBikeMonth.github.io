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
var _a;
// Page modification functions:
// Hide elevation, because it's not in competition
function toggleElevation(ev) {
    ev === null || ev === void 0 ? void 0 : ev.preventDefault();
    const table = document.getElementById('leaderboardTable');
    if (table != null) {
        table.classList.toggle('hide-elevation');
    }
    enableFullscreenTableOverflow();
}
// Enable the button right away, since the script is at the bottom of the page
(_a = document.getElementById('hideElevation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toggleElevation);
function enableFullscreenTableOverflow() {
    Array.from(document.querySelectorAll('.full-screen-table table')).forEach((el) => {
        var _a, _b;
        const table = el;
        const tableWidth = table.offsetWidth;
        if (tableWidth > window.outerWidth + 30) {
            (_a = table.closest('.full-screen-table')) === null || _a === void 0 ? void 0 : _a.classList.add('full-screen-table-overflown');
        }
        else {
            (_b = table.closest('.full-screen-table')) === null || _b === void 0 ? void 0 : _b.classList.remove('full-screen-table-overflown');
        }
    });
}
// Leaderboard rendering functions below here >
const roundOneDecimal = (x) => Math.round(x * 10) / 10;
// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function numDisplay(x) {
    if (x === null) {
        return '';
    }
    return numberWithCommas(roundOneDecimal(x));
}
const newTotal = () => ({ days: 0, miles: 0, feet: 0 });
function renderCell(value, classes = []) {
    const cell = document.createElement('td');
    cell.innerHTML = value;
    classes.forEach((i) => cell.classList.add(i));
    return cell;
}
function addTotals(totals1, totals2) {
    totals1.days += totals2.days;
    totals1.miles += totals2.miles;
    totals1.feet += totals2.feet;
    return totals1;
}
function renderUserRow(userData, totals) {
    console.log(userData);
    const row = document.createElement('tr');
    row.appendChild(renderCell(`<a href="https://www.strava.com/athletes/${userData.stravaId}">${userData.name}</a>`, ['text-left']));
    const rowTotals = newTotal();
    userData.periods.forEach((period, index) => {
        // The first period has a thicker border
        const dayClass = [index === 0 ? 'border-l-3' : 'border-l-2'];
        if (typeof (period.days) !== 'undefined' && period.days !== null) {
            addTotals(rowTotals, period);
        }
        row.appendChild(renderCell(numDisplay(period.days), dayClass));
        row.appendChild(renderCell(numDisplay(period.miles), ['border-l-1']));
        row.appendChild(renderCell(numDisplay(period.feet), ['elevation-cell', 'border-l-1']));
    });
    row.appendChild(renderCell(numDisplay(rowTotals.days), ['border-l-2']));
    row.appendChild(renderCell(numDisplay(rowTotals.miles), ['border-l-1']));
    row.appendChild(renderCell(numDisplay(rowTotals.feet), ['elevation-cell', 'border-l-1']));
    addTotals(totals, rowTotals);
    return row;
}
function renderTotals(periodCount, totals) {
    const row = document.createElement('tr');
    row.classList.add('fw-bold', 'bg-transparent');
    const totalCell = renderCell('<strong>Total</strong>', ['bg-transparent', 'border-b-0']);
    totalCell.setAttribute('colspan', String(periodCount * 3 + 1));
    row.appendChild(totalCell);
    row.appendChild(renderCell(numDisplay(totals.days), ['bg-transparent', 'border-b-0', 'border-l-2']));
    row.appendChild(renderCell(numDisplay(totals.miles), ['bg-transparent', 'border-b-0', 'border-l-1']));
    row.appendChild(renderCell(numDisplay(totals.feet), ['bg-transparent', 'elevation-cell', 'border-b-0', 'border-l-1']));
    return row;
}
fetch('assets/data-2023.json', { cache: 'no-store' })
    .then((res) => __awaiter(void 0, void 0, void 0, function* () { return yield res.json(); }))
    .then(json => {
    const table = document.getElementById('leaderboardBody');
    // NOTE: totals is updated in renderUserRow and not returned (AKA there is a side effect)
    const totals = newTotal();
    json.leaderboard.forEach((userData) => {
        const row = renderUserRow(userData, totals);
        table === null || table === void 0 ? void 0 : table.appendChild(row);
    });
    table === null || table === void 0 ? void 0 : table.appendChild(renderTotals(json.periods.length, totals));
    enableFullscreenTableOverflow();
})
    .catch(error => console.error(error));
