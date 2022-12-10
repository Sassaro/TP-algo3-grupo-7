package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import funcionesAuxiliaresYConstantes.coincidenciaCompleta
import funcionesAuxiliaresYConstantes.coincidenciaInicial
import java.time.LocalDate
import java.time.Period

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type")
@JsonSubTypes(
    JsonSubTypes.Type(value = Motos::class, name = "Moto"),
    JsonSubTypes.Type(value = Autos::class, name = "Auto"),
    JsonSubTypes.Type(value = Camionetas::class, name = "Camioneta"),
)
abstract class Vehiculo(
    val marca: String,
    val modelo: String,
    val anioDeFabricacion: LocalDate,
    var costoDiario: Double,
    var tieneConvenio: Boolean = false,
    var kilometrajeLibre: Boolean = true
) : ElementosDelRepositorio {

    fun antiguedad(): Int {
        return Period.between(anioDeFabricacion, LocalDate.now()).years
    }

    fun costoBase(diasDeAlquiler: Int): Double {
        return this.costoDiario * diasDeAlquiler
    }

    fun costoDeAlquiler(diasDeAlquiler: Int): Double {
        return (this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler)) - tieneDescuento(diasDeAlquiler)
    }

    abstract fun costoEspecifico(diasDeAlquiler: Int): Double

    fun tieneDescuento(diasDeAlquiler: Int): Double {
        if (tieneConvenio) {
            return (this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler)) * DESCUENTO_CONVENIO
        } else {
            return 0.0
        }
    }

    override fun condicionDeBusqueda(string: String): Boolean {
        return coincidenciaCompleta(string, this.marca) ||
                coincidenciaInicial(this.modelo, string)

    }
}

class Motos(
    var cilindradas: Int,
    marca: String,
    modelo: String,
    anioDeFabricacion: LocalDate,
    costoDiario: Double,
    override var id: Int = -1
) : Vehiculo(marca, modelo, anioDeFabricacion, costoDiario) {

    override fun costoEspecifico(diasDeAlquiler: Int): Double {
        if (cilindradas > LIMITE_CILINDRADAS) {
            return 500.0 * diasDeAlquiler
        } else return 0.0
    }
}

class Autos(
        var hatchback: Boolean,
        marca: String,
        modelo: String,
        anioDeFabricacion: LocalDate,
        costoDiario: Double,
        override var id: Int = -1
) : Vehiculo(marca, modelo, anioDeFabricacion, costoDiario) {
    override fun costoEspecifico(diasDeAlquiler: Int): Double {
        if (hatchback) {
            return this.costoBase(diasDeAlquiler) * 0.1
        } else return this.costoBase(diasDeAlquiler) * 0.25
    }
}

class Camionetas(
        var cuatroXCuatro: Boolean,
        marca: String,
        modelo: String,
        anioDeFabricacion: LocalDate,
        costoDiario: Double,
        override var id: Int = -1
) : Vehiculo(marca, modelo, anioDeFabricacion, costoDiario) {

    override fun costoEspecifico(diasDeAlquiler: Int): Double {
        if (cuatroXCuatro) {
            return muchosDias(diasDeAlquiler) * 1.5
        } else return muchosDias(diasDeAlquiler)
    }

    fun muchosDias(diasDeAlquiler: Int): Double {
        if (diasDeAlquiler <= MUCHOS_DIAS_ALQUILER) {
            return 10000.0
        } else {
            return 10000.0 + 1000 * (diasDeAlquiler - MUCHOS_DIAS_ALQUILER)
        }
    }
}


