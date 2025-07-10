import type { Period } from './ForecastGrid'

export function ForecastCard({ period }: { period: Period }) {
  return (
    <article className="flex items-center gap-4 rounded-lg border p-4 shadow">
      <img
        src={period.icon}
        alt=""
        className="h-12 w-12 shrink-0"
        loading="lazy"
      />

      <div>
        <h3 className="font-semibold">{period.name}</h3>
        <p className="text-sm">
          {period.temperature}
          {period.temperatureUnit} – {period.shortForecast}
        </p>
      </div>
    </article>
  )
}
