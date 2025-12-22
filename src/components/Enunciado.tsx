'use client'

interface EnunciadoProps {
  texto: string
}

export default function Enunciado(props: EnunciadoProps){
  return (
    <div className="flex">
      <div className="text-[2.5rem] font-bold">
        {props.texto}
      </div>
    </div>
  )
}