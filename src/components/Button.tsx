'use client'

import Link from "next/link"

interface ButtonProps {
  texto: string
  href?: string
  onClick?: (e: any) => void
}

export default function Button(props: ButtonProps){

  function renderizarButton(){
    return (
      <button   
        className="bg-[#9885F0] text-white rounded-lg font-extralight text-[1.2rem] py-2.5 px-6.25 mt-10 border-none hover:cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"  
        onClick={props.onClick}>
        {props.texto}
      </button>
    )
  }

  return props.href ? (
    <Link href={props.href}>
      {renderizarButton()}
    </Link>
  ) : renderizarButton()
}