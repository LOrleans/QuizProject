import { CountdownCircleTimer } from "react-countdown-circle-timer"

interface TemporizadorProps {
  duracao: number
  tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){
  return (
    <div className="flex text-4xl mt-5 mb-5">
      <CountdownCircleTimer 
      duration={props.duracao}
        size={120}
        isPlaying
        onComplete={props.tempoEsgotado}
        colors={['#00FF00', '#F7B801', '#ED827A', '#FF0000']} // Apenas as cores}
        colorsTime={[props.duracao, props.duracao * 0.6, props.duracao * 0.3, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  )
}