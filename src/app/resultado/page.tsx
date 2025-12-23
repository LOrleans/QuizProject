'use client'

import { useSearchParams } from "next/navigation"

export default function resultado(){
  const searchParams = useSearchParams()

  const total = +(searchParams.get('total') ?? 0)
  const certas = +(searchParams.get('certas') ?? 0)
  const percentual = total > 0 ? Math.round((certas / total) * 100) : 0

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1>Resultado</h1>
      <div>{total}</div>
      <div>{certas}</div>
      <div>{`${percentual}%`}</div>
    </div>
  )
}