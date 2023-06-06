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
