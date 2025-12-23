"use client";

import QuestaoModel from "../models/QuestaoModel";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
  { valor: "A", cor: "#F2C866" },
  { valor: "B", cor: "#F266BA" },
  { valor: "C", cor: "#85D4F2" },
  { valor: "D", cor: "#BCE596" },
];

interface QuestaoProps {
  valor: QuestaoModel;
  onResponse: (indice: number) => void;
  tempoParaResposta?: number
  tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarRespostas() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta
          key={`${questao.id}=${i}`}
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
      <Temporizador key={questao.id} duracao={props.tempoParaResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
      {renderizarRespostas()}
    </div>
  );
}
