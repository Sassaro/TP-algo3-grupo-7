//Estas funciones son solo para el manejo de las horas del dia, no tienen en cuenta el dia de la fecha

const MILISEGUNDOS_A_MINUTOS = 60000

export let FuncionesDeTiempo = {tiempoEntre,esAntes,esDespues,getHora,getCurrentYear}

function tiempoEntre(fecha1:Date,fecha2:Date):number{

    return (getHora(fecha2).getTime() - getHora(fecha1).getTime())/MILISEGUNDOS_A_MINUTOS
}

function esAntes(fechainicial:Date,fechaComparacion:Date):boolean{

    return (getHora(fechaComparacion).getTime() - getHora(fechainicial).getTime() > 0)

}

function esDespues(fechainicial:Date,fechaComparacion:Date):boolean{

    return (getHora(fechaComparacion).getTime() - getHora(fechainicial).getTime() < 0)

}

function getHora(fecha:Date):Date{

    fecha.setFullYear(0)
    fecha.setMonth(0)
    fecha.setDate(0)
    return fecha
}

function getCurrentYear():number{
    let aux = new Date()
    return aux.getFullYear()
}