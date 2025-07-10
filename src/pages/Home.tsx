import { useState } from 'react'
import { AddressForm } from '../components/AddressForm'
import { ErrorBanner } from '../components/ErrorBanner'
import { ForecastGrid } from '../components/ForecastGrid'
import { useGeocode } from '../hooks/useGeocode'
import { useWeather } from '../hooks/useWeather'

export function App() {
  const [addr, setAddr] = useState('')
  const { data: geo, error: geoErr } = useGeocode(addr)
  const { data: periods, error: wxErr } = useWeather(geo?.lat, geo?.lon)

  return (
    <main className="p-4 max-w-xl mx-auto">
      <AddressForm onSubmit={setAddr} />
      {geoErr && <ErrorBanner>{geoErr.message}</ErrorBanner>}
      {wxErr && <ErrorBanner>{wxErr.message}</ErrorBanner>}
      <ForecastGrid periods={periods} isLoading={!periods} />
    </main>
  )
}
