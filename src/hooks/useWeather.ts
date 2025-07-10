import { useQuery } from '@tanstack/react-query'

export function useWeather(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    enabled: !!lat && !!lon,
    queryFn: async () => {
      const meta = await fetch(`/api/weather/points/${lat},${lon}`).then((r) =>
        r.json()
      )
      const forecastUrl = meta.properties.forecast
      const forecast = await fetch(forecastUrl).then((r) => r.json())
      return forecast.properties.periods
    },
    staleTime: 1000 * 60 * 15,
  })
}
