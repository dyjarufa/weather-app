import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useGeocode } from '../hooks/useGeocode'
import { withQueryClient } from './testUtils'

describe('useGeocode', () => {
  it('retorna lat/lon para um endereço', async () => {
    const { result } = renderHook(() => useGeocode('Praça Ramos SP'), {
      wrapper: withQueryClient,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({ lat: 37.7749, lon: -122.4194 })
  })
})
