import type { FormEvent } from 'react'
import { useState } from 'react'

export interface AddressFormProps {
  onSubmit: (address: string) => void
}

export function AddressForm({ onSubmit }: AddressFormProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Digite um endereço (rua, cidade, país)…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  )
}
