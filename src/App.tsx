import { useState } from 'react'

import { AddressForm } from './components/AddressForm'
import { ErrorBanner } from './components/ErrorBanner'
import { ForecastGrid } from './components/ForecastGrid'

import { useGeocode } from './hooks/useGeocode'
import { useWeather } from './hooks/useWeather'

export default function App() {
  const [addr, setAddr] = useState('')

  const { data: geo, error: geoErr, isFetching: geoLoading } = useGeocode(addr)

  const {
    data: periods,
    error: wxErr,
    isFetching: wxLoading,
  } = useWeather(geo?.lat, geo?.lon)

  const isLoading = geoLoading || wxLoading

  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Weather Forecast Demo
      </h1>

      <AddressForm onSubmit={setAddr} />

      {geoErr && <ErrorBanner>{geoErr.message}</ErrorBanner>}
      {wxErr && <ErrorBanner>{wxErr.message}</ErrorBanner>}

      <ForecastGrid periods={periods} isLoading={isLoading} />
    </main>
  )
}
