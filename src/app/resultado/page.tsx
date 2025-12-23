'use client'

import Button from "@/src/components/Button"
import Estatistica from "@/src/components/Estatisticas"
import { useSearchParams } from "next/navigation"

export default function resultado(){
  const searchParams = useSearchParams()

  const total = +(searchParams.get('total') ?? 0)
  const certas = +(searchParams.get('certas') ?? 0)
  const percentual = total > 0 ? Math.round((certas / total) * 100) : 0

  return (
    <div className="flex justify-center items-center flex-col h-screen text-[4rem]">
      <h1 className="font-bold">Resultado Final</h1>
      <div className="flex">
        <Estatistica texto="Perguntas" valor={total}/>
        <Estatistica texto="Certas" corFundo="#9CD2A4" valor={certas}/>
        <Estatistica texto="Percentual" corFundo="#DE6A33" valor={`${percentual}%`}/>
      </div>
      <Button href="/" texto="Jogar de novo"/>
    </div>
  )
}