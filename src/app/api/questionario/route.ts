import { NextResponse } from "next/server";
import questoes from "../../bancoDeQuestoes";
import { Shuffle } from "@/src/functions/arrays";

export async function GET( request: Request ){
  const IDs = questoes.map(q => q.id)
  return NextResponse.json(Shuffle(IDs))
}