"use client";

import RespostaModel from "../models/RespostaModel";

interface RespostaProps {
  valor: RespostaModel;
  indice: number;
  letra: string;
  corBgLetra: string;
  onResponse: (indice: number) => void;
}

export default function Resposta(props: RespostaProps) {
  const resposta = props.valor;
  const respostaRevelada = resposta.revelada

  return (
    <div
      className="flex h-24 m-2.5 w-4/5 min-w-[320px] cursor-pointer perspective-[1000px]"
      onClick={() => props.onResponse(props.indice)}
    >
      <div className={`
        flex flex-1 relative transition-all duration-700 transform-3d
        ${respostaRevelada ? 'transform-[rotateY(180deg)]' : ''} 
      `}>
        {/* FACE DA FRENTE */}
        <div className="absolute inset-0 flex items-center rounded-xl p-4 bg-white text-black backface-hidden [-webkit-backface-visibility:hidden]">
          <div
            style={{ backgroundColor: props.corBgLetra }}
            className="h-10 w-10 flex items-center justify-center rounded-full text-[1.3rem] font-bold mr-5 text-white"
          >
            {props.letra}
          </div>
          <div className="text-[1.3rem] font-bold">
            {resposta.valor}
          </div>
        </div>

        {/* FACE DO VERSO */}
        <div className="absolute inset-0 flex transform-[rotateY(180deg)] backface-hidden [-webkit-backface-visibility:hidden]">
          {resposta.certa ? (
            <div className="flex flex-col flex-1 justify-center items-center bg-[#2BAA6D] text-white p-4 rounded-xl">
              <div className="text-[0.9rem]">A resposta certa é...</div>
              <div className="font-bold text-[1.4rem]">{resposta.valor}</div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 justify-center items-center bg-[#E44A4C] text-white p-4 rounded-xl">
              <div className="text-[0.9rem]">A resposta informada está errada...</div>
              <div className="font-bold text-[1.4rem]">{resposta.valor}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
