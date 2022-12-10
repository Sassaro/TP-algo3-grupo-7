package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import funcionesAuxiliaresYConstantes.coincidenciaParcial

class Itinerario(
    val diasDeActividad: MutableList<DiaDeActividad>,
    val destino: Destino,
    var puntuaciones: MutableList<Puntuacion> = mutableListOf(),
    @JsonIgnore
    var creador: Usuario?,
    override var id: Int = -1
): ElementosDelRepositorio {

    fun clone():Itinerario {
        return Itinerario(this.diasDeActividad,this.destino,this.puntuaciones,this.creador,this.id)
    }

    @JsonProperty("creador")
    fun getCreatorAsString(): UsuarioDTO? {
        return creador?.let { UsuarioDTO(it.id, creador!!.nombre, creador!!.apellido, creador!!.username,
            creador!!.paisDeResidencia) }
    }

    fun cantidadDeDias(): Int {
        return diasDeActividad.size
    }

    fun actividadesEnElItinerario(): List<Actividad> {
        return diasDeActividad.flatMap { it.actividades }
    }

    fun duracionPromedioPorDia(): Double {

        return this.actividadesEnElItinerario().sumOf { it.duracionActividad() }.toDouble() / this.cantidadDeDias()

    }

    fun dificultad(): Dificultad {

        val actividadesEnElItinerario = this.actividadesEnElItinerario()

        val cantBaja = actividadesEnElItinerario.count { it.dificultad == Dificultad.BAJA }
        val cantMedia = actividadesEnElItinerario.count { it.dificultad == Dificultad.MEDIA }
        val cantAlta = actividadesEnElItinerario.count { it.dificultad == Dificultad.ALTA }

        if (cantAlta >= cantMedia && cantAlta >= cantBaja) {
            return Dificultad.ALTA
        } else if (cantMedia >= cantBaja) {
            return Dificultad.MEDIA
        } else {
            return Dificultad.BAJA
        }

    }

    fun costoDelItinerario(): Double {
        return this.actividadesEnElItinerario().sumOf { it.costo }
    }

    fun agregarActividadAItinerario(numeroDeDia:Int,actividad: Actividad): Unit {
            diasDeActividad[numeroDeDia].agregarActividadAlDia(actividad)
    }

    fun tienePuntuacionesRepetidas(): Boolean {
        val listaDeCreadoresDePuntuaciones = puntuaciones.map { it.creador }
        return listaDeCreadoresDePuntuaciones.size != listaDeCreadoresDePuntuaciones.distinct().size
    }

    fun tienePuntuacionesNoValidas(): Boolean {
        return puntuaciones.any { !it.validacion() }
    }

    fun porcentajeDificultadDeActividad(dificultad: Dificultad):Double{
        val actividadesEnElItinerario = this.actividadesEnElItinerario()
        return actividadesEnElItinerario.count { it.dificultad == dificultad }/actividadesEnElItinerario.size.toDouble()*100
    }

    fun puedeModificarItinerario(usuario: Usuario):Boolean{
        return this.creador == usuario || usuario.amigos.contains(this.creador)
    }

    fun agregarPuntuacion(puntuacion: Puntuacion){
        this.puntuaciones.add(puntuacion)
    }

    override fun condicionDeBusqueda(testoDeBusqueda: String): Boolean {

        return this.busquedaPorDestino(testoDeBusqueda) ||
                this.busquedaPorDescripcionDeActividades(testoDeBusqueda)

    }

    fun busquedaPorDestino(testoDeBusqueda:String):Boolean{                 //estos metodos estan solo para facilitar el testeo de cada una de las
        return this.destino.condicionDeBusqueda(testoDeBusqueda)            // clases de equivalencia
    }

    fun busquedaPorDescripcionDeActividades(testoDeBusqueda:String):Boolean{

        return this.actividadesEnElItinerario().any { coincidenciaParcial(it.descripcion,testoDeBusqueda) }
    }


    override fun validacion(): Boolean {
        if (creador == null || destino == null ||
            this.actividadesEnElItinerario().isEmpty() ||
            diasDeActividad.any { it.tieneActividadesSolapadas() } ||
            tienePuntuacionesRepetidas() ||
            tienePuntuacionesNoValidas()
        ) {
            return false
        }
        return true
    }

}
