package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonIgnore
import funcionesAuxiliaresYConstantes.coincidenciaParcial
import java.time.Duration
import java.time.LocalTime

enum class Dificultad {
    BAJA, MEDIA, ALTA
}

class Actividad(
    val costo: Double,
    val descripcion: String,
    val inicio: LocalTime,
    val fin: LocalTime,
    var dificultad: Dificultad,
    override var id: Int = -1
): ElementosDelRepositorio {

    override fun validacion(): Boolean {
        if (costo <= 0.0 || descripcion.isNullOrBlank() || this.iniciaDespuesDeFinalizar() || dificultad == null) {
            return false
        }
        return true
    }

    override fun condicionDeBusqueda(string: String): Boolean {
       return coincidenciaParcial(this.descripcion,string)
    }

    fun duracionActividad(): Int {
        return Duration.between(inicio, fin).toMinutes().toInt()
    }

    fun iniciaDespuesDeFinalizar(): Boolean {
        return inicio.isAfter(fin)
    }
}

