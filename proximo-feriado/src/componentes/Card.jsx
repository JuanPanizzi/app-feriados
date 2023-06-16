import React from 'react'

export const Card = (props) => {

  const { nombreFeriado, difDias, ODFormato, ODFeriado, fechaActual} = props;

  return (
    <>
      <div className='ctn-feriados'>
        <ul>
        {difDias > 1 ?
            <>
             { ODFeriado > fechaActual && <><li>FALTAN</li> <li>{difDias} DÍAS</li></> }
             { ODFeriado < fechaActual && <><li>PASARON</li> <li>{difDias} DÍAS</li></> }
            </>
           :
           <>
           {ODFeriado > fechaActual && <><li>FALTA:</li> <li>{difDias} DÍA</li></>}
           {ODFeriado < fechaActual && <><li>PASÓ:</li> <li>{difDias} DÍA</li></>}
           </>
        }
        <li>{ODFormato}</li>
        <li>{nombreFeriado}</li>

          </ul>
      </div>
    </>
  )
}
