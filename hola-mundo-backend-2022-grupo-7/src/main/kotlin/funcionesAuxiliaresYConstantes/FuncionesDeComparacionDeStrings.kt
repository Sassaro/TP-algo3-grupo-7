package funcionesAuxiliaresYConstantes

fun coincidenciaParcial(stringABuscar: String,stringIngresado: String):Boolean{
    return stringABuscar.uppercase().contains(stringIngresado.uppercase())
}

fun coincidenciaCompleta(stringABuscar: String,stringIngresado: String):Boolean{
    return stringABuscar.uppercase() == stringIngresado.uppercase()
}

fun coincidenciaInicial(stringABuscar: String,stringBuscado: String):Boolean{
    return stringABuscar.uppercase().startsWith(stringBuscado.uppercase())
}