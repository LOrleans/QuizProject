'use client'

import Questao from "../components/Questao";
import QuestaoModel from "../models/QuestaoModel";
import RespostaModel from "../models/RespostaModel";
import { useState } from "react";
import Button from "../components/Button";
import Questionario from "../components/Questionario";

const questaoMock = new QuestaoModel( 1, "Qual é a melhor cor?", [
    RespostaModel.errada("Verde"),
    RespostaModel.errada("Vermelha"),
    RespostaModel.errada("Azul"),
    RespostaModel.certa("Preta"),
  ], false
);

export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)

    function questaoRespondida(questao: QuestaoModel){

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


/*
<Questao valor={questao} onResponse={onResponse} tempoParaResposta={5} tempoEsgotado={tempoEsgotado}/>
<Button texto="Próxima Questão" href='/resultado'/>
*/

/*

function onResponse(indice: number) {
    setQuestao(questao.responderCom(indice))
    console.log(indice);
}

function tempoEsgotado(){
  if(questao.naoRespondida){
    setQuestao(questao.responderCom(-1))
  }
}


*/