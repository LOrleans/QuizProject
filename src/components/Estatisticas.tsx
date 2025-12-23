interface EstatisticaProps {
  valor: any
  texto: string
  corFundo?: string
  corFonte?: string
}

export default function Estatistica(props: EstatisticaProps){
  return (
    <div className="flex flex-col items-center m-2.5 ">
      <div 
        className="flex h-35 w-35 justify-center items-center rounded-[70px] text-[3rem] " 
        style={{ 
          backgroundColor: props.corFundo ?? '#FDD60F', color: props.corFonte ?? '#333' 
        }}
      >
        {props.valor}
      </div>
      <div className="text-[#ddd] text-[1.7rem] font-extralight ">
        {props.texto}
      </div>
    </div>
  )
}