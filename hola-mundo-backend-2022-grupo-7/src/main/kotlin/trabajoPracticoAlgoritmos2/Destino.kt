package trabajoPracticoAlgoritmos2

import funcionesAuxiliaresYConstantes.coincidenciaParcial

class Destino(
    var pais: String,
    var ciudad: String,
    var costo: Double,
    override var id: Int = -1,
    ): ElementosDelRepositorio {

    fun esLocal(): Boolean {
        return pais.uppercase() == PAIS_LOCAL
    }

    fun calcularCostoBase(): Double {

        if (!esLocal()) {
            return costo + costo * BONUS_POR_NO_SER_DESTINO_LOCAL
        } else {
            return costo
        }
    }

    override fun condicionDeBusqueda(textoDeBusqueda: String): Boolean {
        return this.busquedaPorCiudad(textoDeBusqueda) || this.busquedaPorPais(textoDeBusqueda)
    }

    fun busquedaPorCiudad(textoDeBusqueda: String):Boolean{         //estos metodos estan solo para facilitar el testeo de cada una de las
        return coincidenciaParcial(this.ciudad,textoDeBusqueda)        // clases de equivalencia
    }

    fun busquedaPorPais(textoDeBusqueda: String):Boolean{
        return coincidenciaParcial(this.pais,textoDeBusqueda)
    }

    override fun validacion(): Boolean {

        if (pais.isNullOrBlank() || ciudad.isNullOrBlank() || costo <= 0) {
            return false
        }
        return true
    }

}