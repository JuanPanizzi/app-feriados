import React from 'react'

export const Titulo = (props) => {
  
const {OD, fechaActual} = props;
    
return (
    <>
    {OD > fechaActual ? <h1>¿Cuánto falta para el próximo feriado?</h1> : <h1>¿Cuánto pasó desde el feriado anterior?</h1>
    }   
    </>
  )
}
