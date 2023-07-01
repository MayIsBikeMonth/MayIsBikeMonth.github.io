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

interface RideData {
  stravaId: string
  dates: string[]
  miles: number
  feet: number
}
