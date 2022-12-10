package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonTypeRef

class ServiceDeActualizacion(
    val serviceDestinos: ServiceDestinos,
    val objectMapper: ObjectMapper,
    val repositorioDestino: Repositorio<Destino>
) {
    fun getDestinos(): List<Destino> {
        val json = serviceDestinos.getDestinos()
        return objectMapper.readValue(json, jacksonTypeRef<List<Destino>>())
    }

    fun delegarARepositorioDeDestino() {
        val elmentosADelegar = this.getDestinos()
        elmentosADelegar.forEach {
            if (it.id < 0) {
                repositorioDestino.create(it)
            } else {
                repositorioDestino.update(it)
            }
        }
    }
}

fun creadorObjectMapper(): ObjectMapper {
    val objectMapper = jacksonObjectMapper()
    objectMapper.registerModule(JavaTimeModule())
    return objectMapper
}