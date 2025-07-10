export interface GeocodeResponse {
  result: {
    addressMatches: {
      coordinates: { x: number; y: number }
    }[]
  }
}
