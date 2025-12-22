"use client";

import QuestaoModel from "../models/QuestaoModel";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";

const letras = [
  { valor: "A", cor: "#F2C866" },
  { valor: "B", cor: "#F266BA" },
  { valor: "C", cor: "#85D4F2" },
  { valor: "D", cor: "#BCE596" },
];

interface QuestaoProps {
  valor: QuestaoModel;
  onResponse: (indice: number) => void;
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarRespostas() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta
          key={i}
          valor={resposta}
          indice={i}
          letra={letras[i].valor}
          corBgLetra={letras[i].cor}
          onResponse={props.onResponse}
        />
      );
    });
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Enunciado texto={questao.enunciado} />
      {renderizarRespostas()}
    </div>
  );
}
