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

  return (
    // Container das respostas
    <div
      className="flex h-25 m-2.5 w-4/5 min-w-125 relative"
      onClick={() => props.onResponse(props.indice)}
    >
      {/* Outro container das respostas (spreading) */}
      <div className="flex flex-1 ">
        {!resposta.revelada ? (
          // Frente das respostas 
          <div className="flex items-center rounded-xl h-full p-4 bg-white text-black w-full absolute">
            <div
              style={{ backgroundColor: props.corBgLetra }}
              className="h-10 w-10 flex items-center justify-center rounded-[20px] text-[1.3rem] font-bold mr-5 text-white"
            >
              {props.letra}
            </div>
            <div className="text-[1.3rem] font-bold">
              {resposta.valor}
            </div>
          </div>
        ) : (
          // Verso das respostas
          <div className="flex w-full absolute">
            {resposta.certa ? (
              // Div Certa
              <div className="flex flex-col flex-1 justify-center items-center bg-[#2BAA6D] p-4 rounded-xl">
                <div>A resposta certa é...</div>
                <div className="font-bold text-[1.5rem]">{resposta.valor}</div>
              </div>
            ) : (
              // Div Errada
              <div className="flex flex-col flex-1 justify-center items-center bg-[#E44A4C] p-4 rounded-xl">
                <div>A resposta informada está errada...</div>
                <div className="font-bold text-[1.5rem]">{resposta.valor}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
