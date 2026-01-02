import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI('AIzaSyBLjgW2rbdxUtYJWn9l3rOHu5QyjFsn50c')

export async function POST(request: Request){
  const { tema, quantidade } = await request.json()

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  })

  const prompt = `Gere ${quantidade} perguntas de quiz sobre o tema: "${tema}".
    Retorne estritamente um array de objetos no formato JSON:
    [
      {
        "id": number (inteiro aleatório único),
        "enunciado": string,
        "respostas": [
          {"valor": string, "certa": boolean, "revelada": false}
        ],
        "acertou": false
      }
    ]
    Regras:
    - Cada pergunta deve ter exatamente 4 respostas.
    - Apenas uma resposta deve ser certa (certa: true).
    - Não repita IDs dentro do array.`;

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    const perguntas = JSON.parse(responseText)

    return NextResponse.json(perguntas)

  } catch (error) {
    console.error("Erro no Gemini:", error)
    return NextResponse.json({ error: "Falha ao gerar perguntas" }, { status: 500 })
  }
}