import { useQuery } from '@tanstack/react-query'
import type { NWSForecast, WeatherError } from '../type/geoResponse'

interface NWSPoints {
  properties: { forecast: string }
}

function toFixed4(n: number): string {
  return n.toFixed(4)
}

function isValidCoordinate(lat?: number, lon?: number): boolean {
  if (lat == null || lon == null) return false

  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180
}

export function useWeather(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    enabled: isValidCoordinate(lat, lon),
    queryFn: async () => {
      if (!isValidCoordinate(lat, lon)) {
        throw new Error('Coordenadas inválidas')
      }

      try {
        const latStr = toFixed4(lat!)
        const lonStr = toFixed4(lon!)

        const pointsRes = await fetch(
          `/api/weather/points/${latStr},${lonStr}`,
          { cache: 'no-store' }
        )

        if (!pointsRes.ok) {
          const errorData: WeatherError = {
            message: `Falha ao buscar pontos meteorológicos (${pointsRes.status})`,
            status: pointsRes.status,
          }
          throw errorData
        }

        const points: NWSPoints = await pointsRes.json()

        if (!points.properties?.forecast) {
          throw new Error('Dados de forecast não encontrados na resposta')
        }

        const forecastUrl = new URL(points.properties.forecast)

        const proxied = `/api/weather${forecastUrl.pathname}`

        const wxRes = await fetch(proxied, { cache: 'no-store' })

        if (!wxRes.ok) {
          const errorData: WeatherError = {
            message: `Falha ao buscar previsão meteorológica (${wxRes.status})`,
            status: wxRes.status,
          }
          throw errorData
        }

        const contentType = wxRes.headers.get('content-type') || ''
        if (!contentType.includes('json')) {
          throw new Error('Resposta não-JSON do serviço meteorológico')
        }

        const forecast: NWSForecast = await wxRes.json()

        if (!forecast.properties?.periods) {
          throw new Error('Dados de períodos não encontrados na previsão')
        }

        return forecast.properties.periods
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error('Erro desconhecido ao buscar dados meteorológicos')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
