package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type")
@JsonSubTypes(
    JsonSubTypes.Type(value = Neofilo::class, name = "Neofilo"),
    JsonSubTypes.Type(value = Supersticioso::class, name = "Supersticioso"),
    JsonSubTypes.Type(value = Caprichoso::class, name = "Caprichoso"),
    JsonSubTypes.Type(value = Selectivo::class, name = "Selectivo"),
    JsonSubTypes.Type(value = SinLimite::class, name = "SinLimite"),
    JsonSubTypes.Type(value = Combinado::class, name = "Combinado")
)
open class Gustos{
    open fun condicion(auto: Vehiculo): Boolean {
        return false
    }
}

class Neofilo: Gustos() {
    override fun condicion(auto: Vehiculo): Boolean {
        return auto.antiguedad() < 2
    }

}
class Supersticioso: Gustos() {
    override fun condicion(auto: Vehiculo): Boolean {
        return auto.anioDeFabricacion.year % 2 == 0

    }
}
class Caprichoso: Gustos() {
    override fun condicion(auto: Vehiculo): Boolean {
        return auto.modelo.first().uppercase() ==  auto.marca.first().uppercase()
    }

}
class Selectivo(
    var marcaF:String
): Gustos() {

    override fun condicion(auto: Vehiculo): Boolean {
        return auto.marca == marcaF
    }


}
class SinLimite: Gustos() {
    override fun condicion(auto: Vehiculo): Boolean {
         return auto.kilometrajeLibre
    }

}
class Combinado(val listaDeGustos: MutableList<Gustos>): Gustos() {

    fun agregarGusto(gusto: Gustos){
        listaDeGustos.add(gusto)
    }

    override fun condicion(auto: Vehiculo): Boolean {
        return listaDeGustos.all { it.condicion(auto) }
    }

}

