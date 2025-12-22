import QuestaoModel from "../models/QuestaoModel";
import RespostaModel from "../models/RespostaModel";

const questoes: QuestaoModel[] = [
  new QuestaoModel(
    306,
    "Qual animal transmite a Doença de Chagas?",
    [
      RespostaModel.errada("Abelha"),
      RespostaModel.errada("Macaco"),
      RespostaModel.errada("Barata"),
      RespostaModel.certa("Barbeiro"),
    ],
    false
  ),
  new QuestaoModel(
    202,
    "Qual fruta é conhecida no Norte e no Nordestes como Jerimum?",
    [
      RespostaModel.errada("Caju"),
      RespostaModel.errada("Côco"),
      RespostaModel.errada("Chuchu"),
      RespostaModel.certa("Abóbora"),
    ],
    false
  ),
  new QuestaoModel(
    203,
    "Qual é o coletivo de cães?",
    [
      RespostaModel.errada("Manada"),
      RespostaModel.errada("Alcateia"),
      RespostaModel.errada("Rebanho"),
      RespostaModel.certa("Matilha"),
    ],
    false
  ),
  new QuestaoModel(
    204,
    "Qual é o triângulo que tem todos os lados diferentes?",
    [
      RespostaModel.errada("Equilátero"),
      RespostaModel.errada("Isóceles"),
      RespostaModel.errada("Trapézio"),
      RespostaModel.certa("Escaleno"),
    ],
    false
  ),
];

export default questoes;
