import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useWeather } from '../hooks/useWeather'
import { withQueryClient } from './testUtils'

describe('useWeather', () => {
  it('baixa a previsão quando recebe coordenadas', async () => {
    const { result } = renderHook(() => useWeather(37.7749, -122.4194), {
      wrapper: ({ children }) => withQueryClient(children),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const period = result.current.data?.[0]
    expect(period?.name).toBe('Hoje')
    expect(period?.temperature).toBe(20)
  })
})
