import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from '../App'
import { withQueryClient } from './testUtils'

it('faz busca e mostra a previsão', async () => {
  render(withQueryClient(<App />))

  const input = screen.getByPlaceholderText(/endereço/i)
  const button = screen.getByRole('button', { name: /buscar/i })

  fireEvent.change(input, { target: { value: '1600 Amphitheatre Parkway' } })
  fireEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText(/Ensolarado/i)).toBeDefined()
  })
})
