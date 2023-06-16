export const UseDifDias = () => {
    
    const difDiasGlobal = (ODFechaFeriado, ODFechaActual)=>{

        if(ODFechaFeriado > ODFechaActual){ 

            let diffMs = ODFechaFeriado.getTime() - ODFechaActual.getTime();
            let diasRestantes = Math.round(diffMs / (86400000));
            return diasRestantes;
        }else{
            let diffMs =  ODFechaActual.getTime() - ODFechaFeriado.getTime();
            let diasPasados = Math.round(diffMs / (86400000));
            return diasPasados;
        }
    }
 
    return {
        difDiasGlobal
    }
  
}

