import React, { useEffect, useState } from 'react'
import axios from "axios";
import { UseDifDias } from './UseDifDias';
import { getObjDate } from '../helper/getObjDate'
import {feriadosData} from '../config' 

export const UseFeriados = () => {

    const [feriados, setFeriados] = useState([])
    const [objFeriado, setObjFeriado] = useState() //{fecha:'2023-06-17', nombre:'...'}
    const [ODFeriado, setODFeriado] = useState() //Sat Jun 17 2023 21:00:00
    const [ODFormato, setODFormato] = useState() //sábado, 17 de junio de 2023
    const [nombreFeriado, setNombreFeriado] = useState() //'Dia del trabajador'
    const [difDias, setDifDias] = useState()
    
    //Helpers
    const { difDiasGlobal } = UseDifDias();

    //Variables
    const fechaActual = new Date()
    
    //Funciones    
    const getObjFeriado = () => {
        const objFeriado = feriados.find((feriado) => new Date(feriado.fecha) > fechaActual);
        setObjFeriado(objFeriado);
    }
    const getDatesFormats = (objFeriado, opcionesFecha) => {

        const ODReal = getObjDate(objFeriado); //Objeto Date
        let ODFormato = ODReal.toLocaleString('es-ES', opcionesFecha); //Formato - "sábado, 17 de junio de 2023"
        const nombreFeriado = objFeriado.nombre //"Nombre - Día del trabajador"
        
        setODFeriado(ODReal);
        setODFormato(ODFormato);
        setNombreFeriado(nombreFeriado);
    }

    //Handlers
    const handleFeriadoProx = (objFeriado, opcionesFecha) => {
       
        let indexFeriadoProximo = feriados.indexOf(objFeriado); 
        let indexPosterior = indexFeriadoProximo + 1; 
        const objFeriadoPosterior = feriados[indexPosterior];

        const ODReal = getObjDate(objFeriadoPosterior);
        let ODFormato = ODReal.toLocaleString('es-ES', opcionesFecha);
        const nombreFeriado = objFeriadoPosterior.nombre
        const diasRestantes = difDiasGlobal(ODReal, fechaActual)

        setObjFeriado(objFeriadoPosterior)
        setODFeriado(ODReal);
        setODFormato(ODFormato)
        setNombreFeriado(nombreFeriado)
        setDifDias(diasRestantes)
    }

    const handleFeriadoAnterior = (objFeriado, opcionesFecha) => {

        let indexFeriadoProximo = feriados.indexOf(objFeriado) 
        let indexAnterior = indexFeriadoProximo - 1;
        const objFeriadoAnterior = feriados[indexAnterior];

        const ODReal = getObjDate(objFeriadoAnterior);
        let ODFormato = ODReal.toLocaleString('es-ES', opcionesFecha);
        const nombreFeriado = objFeriadoAnterior.nombre
        const diasPasados = difDiasGlobal(ODReal, fechaActual)
        
        setObjFeriado(objFeriadoAnterior)
        setODFeriado(ODReal)
        setODFormato(ODFormato)
        setNombreFeriado(nombreFeriado)
        setDifDias(diasPasados)
    }

    const handleReiniciar = (opcionesFecha, fechaActual, feriados) => {

        const objFeriado = feriados.find((feriado) => new Date(feriado.fecha) > fechaActual)

        const ODReal = getObjDate(objFeriado)
        let ODFormato = ODReal.toLocaleString('es-ES', opcionesFecha);
        const nombreFeriado = objFeriado.nombre
        const diasRestantes = difDiasGlobal(ODReal, fechaActual)
        
        setObjFeriado(objFeriado)
        setODFeriado(ODReal)
        setODFormato(ODFormato)
        setNombreFeriado(nombreFeriado)
        setDifDias(diasRestantes)
    }

    //Para simular petición con json.server ejecutar getFeriados() y desactivar 'setFeriados(feriadosData)'
    const getFeriados = async () => {
        try {
            const res = await axios.get('http://localhost:4040/feriados')
            setFeriados(res.data)
        } catch (error) {
            alert('Hubo un error en la petición ¡Intenta otra vez!')
            console.log(error)
        }
    }
    //
    
    useEffect(() => {
        //Para simular petición con json.server ejecutar getFeriados() y desactivar 'setFeriados(feriadosData)'
       //getFeriados();
        setFeriados(feriadosData)
    }, [])

    useEffect(() => {
        if (feriados.length > 0) {
            getObjFeriado()
        }
   
    }, [feriados])

    return {
        feriados,
        ODFeriado,
        objFeriado,
        nombreFeriado,
        ODFormato,
        difDias,
        //Funciones
        getObjFeriado,
        getDatesFormats,
        handleFeriadoProx,
        handleFeriadoAnterior,
        handleReiniciar,
        setDifDias
    }
}
