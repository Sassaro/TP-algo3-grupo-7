package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type")
@JsonSubTypes(
    JsonSubTypes.Type(value = Relajado::class, name = "Relajado"),
    JsonSubTypes.Type(value = Precavido::class, name = "Precavido"),
    JsonSubTypes.Type(value = Localista::class, name = "Localista"),
    JsonSubTypes.Type(value = Soniador::class, name = "Soniador"),
    JsonSubTypes.Type(value = Activo::class, name = "Activo"),
    JsonSubTypes.Type(value = Exigente::class, name = "Exigente")
)
open class Criterio() {

    open lateinit var tipo:String

    open fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return false
    }
}

class Relajado(
    override var tipo: String = "Relajado"
) : Criterio() {



    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return true
    }

}

class Precavido(
    override var tipo: String = "Precavido"
) : Criterio() {
    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return (usuario.amigos.flatMap { it.destinosVisitados }).contains(itinerario.destino) or (usuario.conoceDestino(
            itinerario.destino
        ))
    }
}

class Localista(
    override var tipo: String = "Localista"
) : Criterio() {
    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return itinerario.destino.esLocal()
    }
}

class Soniador(
    override var tipo: String = "Soniador"
) : Criterio() {
    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        val aux = usuario.destinosDeseados.maxOf { it.calcularCostoBase() }
        return (aux < itinerario.destino.calcularCostoBase()) or (usuario.destinosDeseados.contains(itinerario.destino))
    }
}

class Activo(
    override var tipo: String = "Activo"
) : Criterio() {
    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return itinerario.diasDeActividad.all { !it.estaVacio() }

    }
}

class Exigente(
    var dificultad: Dificultad,
    var porcentaje: Double,
    override var tipo: String = "Exigente"
    ) : Criterio() {

    override fun aceptaItinerario(usuario: Usuario, itinerario: Itinerario): Boolean {
        return itinerario.porcentajeDificultadDeActividad(dificultad) >= porcentaje
    }
}
