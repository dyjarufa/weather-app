import { useQuery } from '@tanstack/react-query'
import type { GeocodeResponse } from '../type/geoResponse'

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

      const url = `/api/geocode/locations/onelineaddress?${params}&ts=${Date.now()}`

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (!res.ok) throw new Error(`Geocode ${res.status}`)

      const data = (await res.json()) as GeocodeResponse
      const match = data.result.addressMatches[0]
      if (!match) throw new Error('Endereço não encontrado')

      const { x: lon, y: lat } = match.coordinates
      return { lat, lon }
    },
  })
}
