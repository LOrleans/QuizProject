import QuestaoModel from "../models/QuestaoModel";
import Button from "./Button";
import Questao from "./Questao";

interface QuestionarioProps {
  questao: QuestaoModel;
  ultima: boolean;
  questaoRespondida: (questao: QuestaoModel) => void;
  proximoPasso: () => void;
}

export default function Questionario(props: QuestionarioProps) {
  function onResponse(indice: number) {
    if (props.questao.naoRespondida) {
      props.questaoRespondida(props.questao.responderCom(indice));
    }
  }

  return (
    // Questionario
    <div className="flex flex-col justify-center items-center h-screen">
      {props.questao ? (
        <Questao
          valor={props.questao}
          tempoParaResposta={5}
          onResponse={onResponse}
          tempoEsgotado={props.proximoPasso}
        />
      ) : (
        false
      )}
      <Button
        onClick={props.proximoPasso}
        texto={props.ultima ? "Finalizar" : "Próxima"}
      />
    </div>
  );
}
