// Hide elevation, because it's not in competition
const toggleElevation = (e = false) => {
  e?.preventDefault()
  document.getElementById('leaderboardTable').classList.toggle('hide-elevation')
}
document.getElementById('hideElevation').addEventListener('click', toggleElevation)

const roundOneDecimal = (x) => Math.round(x * 10) / 10
// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const numDisplay = (x) => {
  if (x === null) { return '' }
  return numberWithCommas(roundOneDecimal(x))
}

window.totals = { days: 0, miles: 0, feet: 0 }

const renderCell = (value, classes = []) => {
  const cell = document.createElement('td')
  cell.innerHTML = value
  classes.forEach((i) => cell.classList.add(i))
  return cell
}

const renderUserRow = (userData) => {
  console.log(userData)
  const row = document.createElement('tr')
  row.appendChild(renderCell(`<a href="https://www.strava.com/athletes/${userData.stravaId}">${userData.name}</a>`, ['text-left']))
  let totalDays = 0
  let totalMiles = 0
  let totalFeet = 0
  userData.periods.forEach((period, index) => {
    // The first period has a thicker border
    const dayClass = [index === 0 ? 'border-l-3' : 'border-l-2']
    if (typeof (period.days) !== 'undefined' && period.days !== null) {
      totalDays += period.days
      totalMiles += period.miles
      totalFeet += period.feet
    }
    row.appendChild(renderCell(period.days, dayClass))
    row.appendChild(renderCell(numDisplay(period.miles), ['border-l-1']))
    row.appendChild(renderCell(numDisplay(period.feet), ['elevation-cell', 'border-l-1']))
  })
  window.totals.days += totalDays
  window.totals.miles += totalMiles
  window.totals.feet += totalFeet
  row.appendChild(renderCell(totalDays, ['border-l-2']))
  row.appendChild(renderCell(numDisplay(totalMiles), ['border-l-1']))
  row.appendChild(renderCell(numDisplay(totalFeet), ['elevation-cell', 'border-l-1']))
  return row
}

const renderTotals = (periodCount) => {
  const row = document.createElement('tr')
  row.classList.add('fw-bold', 'bg-transparent')
  const totalCell = renderCell('<strong>Total</strong>', ['bg-transparent', 'border-b-0'])
  totalCell.setAttribute('colspan', periodCount * 3 + 1)
  row.appendChild(totalCell)
  row.appendChild(renderCell(window.totals.days, ['bg-transparent', 'border-b-0', 'border-l-2']))
  row.appendChild(renderCell(numDisplay(window.totals.miles), ['bg-transparent', 'border-b-0', 'border-l-1']))
  row.appendChild(renderCell(numDisplay(window.totals.feet), ['bg-transparent', 'elevation-cell', 'border-b-0', 'border-l-1']))
  return row
}

fetch('assets/data-2023.json', { cache: 'no-store' })
  .then(res => res.json())
  .then(json => {
    const table = document.getElementById('leaderboardBody')

    json.leaderboard.forEach((userData) => {
      const row = renderUserRow(userData)
      table.appendChild(row)
    })
    table.appendChild(renderTotals(json.periods.length))
  })
