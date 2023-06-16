export const getObjDate = (objFeriado)=>{

    const ODMenosUno = objFeriado ? new Date(objFeriado.fecha) : null; 
    let ODReal = new Date(ODMenosUno.getTime());
    ODReal.setDate(ODMenosUno.getDate() + 1);
    return ODReal;
}