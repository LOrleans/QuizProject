'use client'

import Image from "next/image";
import Questao from "../components/Questao";
import QuestaoModel from "../models/QuestaoModel";
import RespostaModel from "../models/RespostaModel";
import { useState } from "react";

const questaoMock = new QuestaoModel( 1, "Qual é a melhor cor?", [
    RespostaModel.errada("Verde"),
    RespostaModel.errada("Vermelha"),
    RespostaModel.errada("Azul"),
    RespostaModel.certa("Preta"),
  ], false
);

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)

  function onResponse(indice: number) {
    setQuestao(questao.responderCom(indice))
    console.log(indice);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Questao valor={questao} onResponse={onResponse} />
    </div>
  );
}
