'use client'

import Questao from "../components/Questao";
import QuestaoModel from "../models/QuestaoModel";
import RespostaModel from "../models/RespostaModel";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Questionario from "../components/Questionario";

const questaoMock = new QuestaoModel( 1, "Qual é a melhor cor?", [
    RespostaModel.errada("Verde"),
    RespostaModel.errada("Vermelha"),
    RespostaModel.errada("Azul"),
    RespostaModel.certa("Preta"),
  ], false
);

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const [idsQuestions, setIdsQuestions] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock)
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function loadIDsQuestions(){
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsQuestions = await resp.json()
    setIdsQuestions(idsQuestions)
  }

  async function loadQuestion(idQuestao: number){
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    loadIDsQuestions()
  }, [])

  useEffect(() => {
    idsQuestions.length > 0 && loadQuestion(idsQuestions[0])
  }, [idsQuestions])

  function questaoRespondida(questaoRespondida: QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou 
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function proximoPasso(){
      
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <Questionario 
        questao={questao}
        ultima={true}
        questaoRespondida={questaoRespondida}
        proximoPasso={proximoPasso}
      />
    </div>
  );
}