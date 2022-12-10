package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import funcionesAuxiliaresYConstantes.coincidenciaCompleta
import funcionesAuxiliaresYConstantes.coincidenciaParcial
import java.time.LocalDate
import java.time.Period

data class UsuarioDTO(
    val id:Int,
    val nombre: String,
    val apellido: String,
    val username: String,
    val paisDeResidencia: String
)

class Usuario(
    var nombre: String,
    val apellido: String,
    val username: String,
    val fechaDeAlta: LocalDate,
    val paisDeResidencia: String,
    var diasParaViajar: Int,
    @JsonIgnore
    var amigos: MutableList<Usuario> = mutableListOf(),
    var destinosDeseados: MutableList<Destino> = mutableListOf(),
    var destinosVisitados: MutableList<Destino> = mutableListOf(),
    var criterio: Criterio,
    var itinerarios: MutableList<Itinerario> = mutableListOf(),
    var gustos: Gustos,
    private val tareas: MutableList<Tarea> = mutableListOf(),
    override var id: Int = -1,
    val contrasenia:String = ""
) : ElementosDelRepositorio {

   @JsonProperty("amigos")
    fun getAmigosAsString(): List<UsuarioDTO> {
        return amigos.map { UsuarioDTO(it.id,it.nombre, it.apellido, it.username,it.paisDeResidencia) }
    }

    fun calcularAntiguedad(): Int {
        return Period.between(fechaDeAlta, LocalDate.now()).years
    }

    fun calcularCostoDeViaje(destino: Destino): Double {                                                        //calcula el costo del viaje sin itinerario
        val costoBase = destino.calcularCostoBase()
        if (this.paisDeResidencia.uppercase() == destino.pais.uppercase()) {
            return costoBase - (destino.costo * (minOf(15, this.calcularAntiguedad()).toDouble() / 100))
        } else {
            return costoBase
        }
    }

    fun conoceDestino(destino: Destino): Boolean {
        return (this.destinosDeseados.contains(destino) || this.destinosVisitados.contains(destino))
    }

    fun deseaDestino(destino: Destino): Boolean {
        return this.destinosDeseados.contains(destino)
    }

    fun tieneAmigos(): Boolean {
        return this.amigos.isNotEmpty()
    }

    fun amigosConocenDestino(destino: Destino): Boolean {
        return amigos.any { it.conoceDestino(destino) }
    }

    fun puedeRealizarItinerario(itinerario: Itinerario): Boolean {
        return (this.diasParaViajar >= itinerario.cantidadDeDias()) && (this.criterio.aceptaItinerario(this, itinerario))
    }

    fun crearPuntuacion(nota: Int): Puntuacion {
        return Puntuacion(nota, this)
    }

    fun puedePuntuarIitinerario(itinerario: Itinerario): Boolean {
        return this.conoceDestino(itinerario.destino) && itinerario.creador != this && !(itinerario.puntuaciones.map { it.creador }
            .contains(this))
    }

    fun puntuarItinerario(itinerario: Itinerario, nota: Int) {
        if (!this.puedePuntuarIitinerario(itinerario)) {
            throw RuntimeException("No se pueden puntuar itinerarios de los cuales se es creador, ya se puntuaron o del cual no se conoce su destino")
        } else {
            itinerario.agregarPuntuacion(this.crearPuntuacion(nota))
        }
    }

    fun cambiarCriterio(criterio: Criterio) {
        this.criterio = criterio
    }

    fun leGustaVechiculo(vehiculo: Vehiculo): Boolean {
        return gustos.condicion(vehiculo)
    }

    fun ejecutarTareas() {
        tareas.forEach { it.accion(this) }
    }

    override fun validacion(): Boolean {

        if (nombre.isNullOrBlank() ||
            apellido.isNullOrBlank() ||
            username.isNullOrBlank() ||
            paisDeResidencia.isNullOrBlank() ||
            fechaDeAlta.isAfter(LocalDate.now()) ||
            diasParaViajar <= 0 || destinosDeseados.isEmpty()
        ) {
            return false
        }
        return true
    }

    //############################################################# Funciones De Agregar/Quitar Valores a listas #############################################################

    fun agregarItinerario(itinerario: Itinerario): Unit {                                                       //agrega itinerario a la lista de itinerarios
        this.itinerarios.add(itinerario)
    }

    fun agregarDestinoDeseado(destino: Destino): Unit {
        this.destinosDeseados.add(destino)
    }

    fun agregarDestinoVisitado(destino: Destino): Unit {
        this.destinosVisitados.add(destino)
    }

    fun agregarTarea(tarea: Tarea) {
        this.tareas.add(tarea)
    }

    fun quitarTarea(tarea: Tarea) {
        this.tareas.remove(tarea)
    }

    fun agregarAmigos(usuario: Usuario): Unit {
        this.amigos.add(usuario)
    }

    //############################################################# Funciones De Busqueda en el Repo #############################################################
    override fun condicionDeBusqueda(testoDeBusqueda: String): Boolean {

        return busquedaPorNombre(testoDeBusqueda) ||
                busquedaPorApellido(testoDeBusqueda) ||
                busquedaPorUsername(testoDeBusqueda)

    }

    fun busquedaPorNombre(testoDeBusqueda: String): Boolean {       //estos metodos estan solo para facilitar el testeo de cada una de las
        return coincidenciaParcial(this.nombre, testoDeBusqueda)    // clases de equivalencia
    }

    fun busquedaPorApellido(testoDeBusqueda: String): Boolean {
        return coincidenciaParcial(this.apellido, testoDeBusqueda)
    }

    fun busquedaPorUsername(testoDeBusqueda: String): Boolean {
        return coincidenciaCompleta(this.username, testoDeBusqueda)
    }

    //############################################################# Funciones De edicion de Itinerario #############################################################

    fun agregarActividadAlItinerario(itinerario: Itinerario, dia: Int, actividad: Actividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            itinerario.agregarActividadAItinerario(dia, actividad)
        }
    }

    fun quitarActividadDelItinerario(itinerario: Itinerario, dia: Int, actividad: Actividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            itinerario.diasDeActividad[dia].actividades.remove(actividad)
        }
    }

    fun agregarDiaAlItinerario(itinerario: Itinerario, diaDeActividad: DiaDeActividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            itinerario.diasDeActividad.add(diaDeActividad)
        }
    }

    fun quitarDiaAlItinerario(itinerario: Itinerario, diaDeActividad: DiaDeActividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            itinerario.diasDeActividad.remove(diaDeActividad)
        }
    }

}
