'use client'

import QuestaoModel from "../../models/QuestaoModel";
import { useEffect, useState } from "react";
import Questionario from "../../components/Questionario";
import { useRouter } from "next/navigation";

export default function Quiz() {
  const router = useRouter()

  const [questoes, setQuestoes] = useState<QuestaoModel[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('perguntas_quiz')
    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos)
        
        // Verifica se 'dados' é um array. 
        // Se o Gemini retornou um objeto com as perguntas dentro, usamos dados.perguntas
        const listaPerguntas = Array.isArray(dados) ? dados : (dados.perguntas || [])

        if (listaPerguntas.length > 0) {
          const modelos = listaPerguntas.map((obj: any) => QuestaoModel.criarUsandoObjeto(obj))
          setQuestoes(modelos)
          setQuestao(modelos[0])
        }
      } catch (e) {
        console.error("Erro ao processar perguntas do localStorage", e)
      }
    } else {
      router.push('/')
    }
  }, [router])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    if (acertou) setRespostasCertas(prev => prev + 1)
    
    // Atualiza o array de questões com a questão respondida (importante para o estado)
    const novasQuestoes = questoes.map(q => q.id === questaoRespondida.id ? questaoRespondida : q)
    setQuestoes(novasQuestoes)
  }

  function idProximaPergunta() {
    if (questao) {
      const ids = questoes.map(q => q.id)
      const proximoIndice = ids.indexOf(questao.id) + 1
      return ids[proximoIndice]
    }
  }

  function proximoPasso() {
      const proximoId = idProximaPergunta()
      proximoId ? proximaQuestao(proximoId) : finalizar()
  }

  function proximaQuestao(proximoId: number) {
      const proxima = questoes.find(q => q.id === proximoId)
      setQuestao(proxima)
  }

  function finalizar() {
      const url = `/resultado?total=${questoes.length}&certas=${respostasCertas}`
      
      // Opcional: Limpar o localStorage ao finalizar para não sobrar lixo
      localStorage.removeItem('perguntas_quiz')
      
      router.push(url)
  }

  if (!questao) {
      return (
          <div className="flex h-screen justify-center items-center text-white bg-slate-900">
              <p className="text-xl animate-pulse">Preparando seu Quiz...</p>
          </div>
      )
  }

  return (
      <div className="flex h-screen justify-center items-center flex-col bg-slate-900">
          <Questionario
              questao={questao}
              ultima={idProximaPergunta() === undefined}
              questaoRespondida={questaoRespondida}
              proximoPasso={proximoPasso}
          />
      </div>
  );
}