'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home(){
  const [tema, setTema] = useState('')
  const [quantidade, setQuantidade] = useState(5)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function iniciarQuiz() {
    if(!tema) return alert("Por favor, digite um tema!")
    
    setLoading(true)
    try {
      const resp = await fetch('/api/gerarPerguntas', {
        method: 'POST',
        body: JSON.stringify({ tema, quantidade }),
        headers: { 'Content-Type': 'application/json' }
      })

      const perguntas = await resp.json()

      // Temporário, mudar para Context API depois
      localStorage.setItem('perguntas_quiz', JSON.stringify(perguntas))

      router.push('/quiz')
    } catch (error) {
      console.error(error)
      alert("Erro ao gerar perguntas, tente novamente")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-5">
      <h1 className="text-4xl font-bold mb-8">IA Quiz Challenge</h1>
      
      <div className="flex flex-col w-full max-w-md gap-4 bg-slate-800 p-8 rounded-xl shadow-lg">
          <label className="flex flex-col gap-2">
              <span className="font-semibold text-slate-300">Sobre o que você quer jogar?</span>
              <input 
                  type="text" 
                  placeholder="Ex: História do Brasil, Astronomia, One Piece..."
                  className="p-3 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tema}
                  onChange={e => setTema(e.target.value)}
              />
          </label>

          <label className="flex flex-col gap-2">
              <span className="font-semibold text-slate-300">Quantidade de perguntas:</span>
              <input 
                  type="number" 
                  min={1} max={10}
                  className="p-3 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={quantidade}
                  onChange={e => setQuantidade(+e.target.value)}
              />
          </label>

          <button 
            onClick={iniciarQuiz}
            disabled={loading}
            className={`mt-4 p-4 rounded-lg font-bold text-lg transition-all ${
              loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`
            }
          >
              {loading ? 'IA Gerando Perguntas...' : 'Gerar Quiz'}
          </button>
      </div>
    </div>
  )
}