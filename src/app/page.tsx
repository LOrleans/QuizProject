'use client'

import QuestaoModel from "../models/QuestaoModel";
import { useEffect, useState } from "react";
import Questionario from "../components/Questionario";
import { useRouter } from "next/navigation";

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [idsQuestions, setIdsQuestions] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
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

  function idProximaPergunta(){
    if(questao){
      const proximoIndice = idsQuestions.indexOf(questao.id) + 1
      return idsQuestions[proximoIndice]
    }
  }

  function proximoPasso(){
    const proximoId = idProximaPergunta()
    proximoId ? proximaQuestao(proximoId) : finalizar()
  }

  function proximaQuestao(proximoId: number){
    loadQuestion(proximoId)
  }

  function finalizar() {
    // Construindo a URL com parâmetros de busca
    const url = `/resultado?total=${idsQuestions.length}&certas=${respostasCertas}`
    router.push(url)
  }

  if (!questao) {
    return <div>Carregando pergunta...</div>;
  }
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <Questionario 
        questao={questao}
        ultima={idProximaPergunta() === undefined}
        questaoRespondida={questaoRespondida}
        proximoPasso={proximoPasso}
      />
    </div>
  );
}