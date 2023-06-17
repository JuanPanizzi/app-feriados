import React, { useEffect, useState } from 'react'
import { UseFeriados } from '../hooks/UseFeriados'
import { Card } from './Card';
import { Spinner } from './Spinner';
import { UseDifDias } from '../hooks/UseDifDias';
import { Titulo } from '../shared/Titulo';


export const MainPage = (props) => {

    const { difDiasGlobal } = UseDifDias();
    
    const { feriados,
        objFeriado,
        ODFeriado,
        nombreFeriado,
        ODFormato,
        difDias,
        setDifDias,
        getObjFeriado,
        getDatesFormats,
        handleFeriadoProx,
        handleFeriadoAnterior,
        handleReiniciar } = UseFeriados();

    //states
    const [loading, setLoading] = useState(true)

    //Variables
    const fechaActual = new Date();
    const opcionesFecha = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    useEffect(() => {
        if (feriados.length > 0 && objFeriado) {
            getDatesFormats(objFeriado, opcionesFecha);
            setLoading(false)
        }
    }, [objFeriado])

    useEffect(() => {
        if (ODFeriado) {
            let difDias = difDiasGlobal(ODFeriado, fechaActual)
            setDifDias(difDias);
        }
    }, [ODFeriado])

    if (ODFeriado > new Date(2023, 11, 26) || ODFeriado < new Date(2023, 0, 1) && !loading) {
        return (
            <div className='ctn-sinFeriados'>
                <h2>¡No hay mas feriados este año!</h2>
                <button onClick={() => handleReiniciar(opcionesFecha, fechaActual, feriados)} className='btn-sinFeriados mt-3'>Reiniciar</button>
            </div>
        )
    }

    return (
        <>
            {objFeriado && !loading ?
                <>
                    <Titulo OD={ODFeriado} fechaActual={fechaActual} />
                    <Card
                        nombreFeriado={nombreFeriado}
                        difDias={difDias}
                        ODFormato={ODFormato}
                        ODFeriado={ODFeriado}
                        fechaActual={fechaActual} />
                    <div className='ctn-btns'>
                        <button onClick={() => handleFeriadoAnterior(objFeriado, opcionesFecha)} className='btn-feriados'>Ver Anterior</button>
                        <button onClick={() => handleReiniciar(opcionesFecha, fechaActual, feriados)} className='btn-feriados'>Reiniciar</button>
                        <button onClick={() => handleFeriadoProx(objFeriado, opcionesFecha)} className='btn-feriados'>Ver Próximo</button>
                    </div>
                </>
                : <Spinner />}
        </>
    )
}