import { useQuery } from '@tanstack/react-query'
import type { GeocodeResponse } from '../schema/geoResponse'

export function useGeocode(address: string) {
  return useQuery({
    queryKey: ['geocode', address],
    enabled: !!address,
    queryFn: async () => {
      const params = new URLSearchParams({
        address,
        benchmark: '2020',
        format: 'json',
      })
      const res = await fetch(`/api/geocode?${params.toString()}`)
      if (!res.ok) throw new Error('Geocode failed')
      const data = (await res.json()) as GeocodeResponse
      const { x: lon, y: lat } = data.result.addressMatches[0].coordinates
      return { lat, lon }
    },
  })
}
