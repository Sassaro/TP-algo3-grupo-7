export const validate = (saved, extraFunc) => {
    return saved && extraFunc
}

export const validateVarious = (args) =>{
    return args.every((it) => {return it} )
}

export function getErrorMessage(error) {
    return error.response?.data ? error.response.data.message : error.message
}

export const convertDateToString = (time) =>{

    if (time.getHours() < 10){
        
        if(time.getMinutes() < 10){
            return "0" + time.getHours() + ":" + "0" + time.getMinutes()
        }else{
            return "0" + time.getHours() + ":" + time.getMinutes()
        }

    }else{

        if(time.getMinutes() < 10){
            return time.getHours() + ":" + "0" + time.getMinutes()
        }else{
            return time.getHours() + ":" + time.getMinutes()
        }  
    }
}

//Estas funciones son solo para el manejo de las horas del dia, no tienen en cuenta el dia de la fecha

const MILISEGUNDOS_A_MINUTOS = 60000

export const FuncionesDeTiempo = {tiempoEntre,esAntes,esDespues,getHora,getCurrentYear}

function tiempoEntre(fecha1,fecha2){

    return (getHora(fecha2).getTime() - getHora(fecha1).getTime())/MILISEGUNDOS_A_MINUTOS
}

function esAntes(fechainicial,fechaComparacion){

    return getHora(fechaComparacion).getTime() - getHora(fechainicial).getTime() > 0

}

function esDespues(fechainicial,fechaComparacion){

    return getHora(fechaComparacion).getTime() - getHora(fechainicial).getTime() < 0

}

function getHora(fecha){

    fecha.setFullYear(0)
    fecha.setMonth(0)
    fecha.setDate(0)
    return fecha
}

function getCurrentYear(){
    const aux = new Date()
    return aux.getFullYear()
}

