// Page modification functions:
// Hide elevation, because it's not in competition
function toggleElevation (ev: Event): void {
  ev?.preventDefault()
  const table = document.getElementById('leaderboardTable')
  if (table != null) {
    (table as HTMLTableElement).classList.toggle('hide-elevation')
  }
  enableFullscreenTableOverflow()
}
// Enable the button right away, since the script is at the bottom of the page
document.getElementById('hideElevation')?.addEventListener('click', toggleElevation)

function enableFullscreenTableOverflow (): void {
  console.log('running enableFullscreenTableOverflow')
  Array.from(document.querySelectorAll('.full-screen-table table')).forEach((el: Element) => {
    const table = el as HTMLTableElement
    const tableWidth = table.offsetWidth
    if (tableWidth > window.outerWidth + 30) {
      table.closest('.full-screen-table')?.classList.add('full-screen-table-overflown')
    } else {
      table.closest('.full-screen-table')?.classList.remove('full-screen-table-overflown')
    }
  })
}

// Leaderboard rendering functions below here >
interface Totals {
  days: number
  miles: number
  feet: number
}
interface UserData {
  name: string
  stravaId: string
  periods: Totals[]
}

const roundOneDecimal = (x: number): number => Math.round(x * 10) / 10
// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
const numberWithCommas = (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
function numDisplay (x: number): string {
  if (x === null) { return '' }
  return numberWithCommas(roundOneDecimal(x))
}

const newTotal = (): Totals => ({ days: 0, miles: 0, feet: 0 })

function renderCell (value: string, classes: string[] = []): HTMLTableCellElement {
  const cell = document.createElement('td')
  cell.innerHTML = value
  classes.forEach((i) => cell.classList.add(i))
  return cell
}

function addTotals (totals1: Totals, totals2: Totals): Totals {
  totals1.days += totals2.days
  totals1.miles += totals2.miles
  totals1.feet += totals2.feet
  return totals1
}

function renderUserRow (userData: UserData, totals: Totals): HTMLTableRowElement {
  console.log(userData)
  const row = document.createElement('tr')
  row.appendChild(renderCell(`<a href="https://www.strava.com/athletes/${userData.stravaId}">${userData.name}</a>`, ['text-left']))
  const rowTotals = newTotal()
  userData.periods.forEach((period, index: number) => {
    // The first period has a thicker border
    const dayClass = [index === 0 ? 'border-l-3' : 'border-l-2']
    if (typeof (period.days) !== 'undefined' && period.days !== null) {
      addTotals(rowTotals, period)
    }
    row.appendChild(renderCell(numDisplay(period.days), dayClass))
    row.appendChild(renderCell(numDisplay(period.miles), ['border-l-1']))
    row.appendChild(renderCell(numDisplay(period.feet), ['elevation-cell', 'border-l-1']))
  })
  row.appendChild(renderCell(numDisplay(rowTotals.days), ['border-l-2']))
  row.appendChild(renderCell(numDisplay(rowTotals.miles), ['border-l-1']))
  row.appendChild(renderCell(numDisplay(rowTotals.feet), ['elevation-cell', 'border-l-1']))
  addTotals(totals, rowTotals)
  return row
}

function renderTotals (periodCount: number, totals: Totals): HTMLTableRowElement {
  const row = document.createElement('tr')
  row.classList.add('fw-bold', 'bg-transparent')
  const totalCell = renderCell('<strong>Total</strong>', ['bg-transparent', 'border-b-0'])
  totalCell.setAttribute('colspan', String(periodCount * 3 + 1))
  row.appendChild(totalCell)
  row.appendChild(renderCell(numDisplay(totals.days), ['bg-transparent', 'border-b-0', 'border-l-2']))
  row.appendChild(renderCell(numDisplay(totals.miles), ['bg-transparent', 'border-b-0', 'border-l-1']))
  row.appendChild(renderCell(numDisplay(totals.feet), ['bg-transparent', 'elevation-cell', 'border-b-0', 'border-l-1']))
  return row
}

fetch('assets/data-2023.json', { cache: 'no-store' })
  .then(async res => await res.json())
  .then(json => {
    const table = document.getElementById('leaderboardBody')
    // NOTE: totals is updated in renderUserRow and not returned (AKA there is a side effect)
    const totals = newTotal()
    json.leaderboard.forEach((userData: UserData) => {
      const row = renderUserRow(userData, totals)
      table?.appendChild(row)
    })
    table?.appendChild(renderTotals(json.periods.length, totals))
    enableFullscreenTableOverflow()
  })
  .catch(error => console.error(error))
