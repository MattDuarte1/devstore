'use client'

import { useSearchParams } from 'next/navigation'

export function CurrentSeach() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  return (
    <p className="text-sm">
      Resultado para: <span className="font-semibold">{query}</span>
    </p>
  )
}
