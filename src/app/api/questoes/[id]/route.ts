import { NextResponse } from "next/server"
import questoes from "@/src/app/bancoDeQuestoes";

export async function GET( request: Request, { params }: {params: Promise<{ id: string }>} ) {
  const idParam = +(await params).id;
  const questaoSelecionada = questoes.find(q => q.id === idParam)

  if(questaoSelecionada){
    const perguntaComRespostasShuffled = questaoSelecionada.shuffleRespostas()
    return NextResponse.json(perguntaComRespostasShuffled.toObject())
  }

  return new NextResponse(null, { status: 204 });
}