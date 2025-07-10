import { ForecastCard } from './ForecastCard'

export interface Period {
  number: number
  name: string
  temperature: number
  temperatureUnit: string
  shortForecast: string
  icon: string
}

interface ForecastGridProps {
  periods?: Period[]
  isLoading: boolean
}

export function ForecastGrid({ periods, isLoading }: ForecastGridProps) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando previsão…</p>
  }

  if (!periods?.length) return null

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      {periods.map((p) => (
        <ForecastCard key={p.number} period={p} />
      ))}
    </section>
  )
}
