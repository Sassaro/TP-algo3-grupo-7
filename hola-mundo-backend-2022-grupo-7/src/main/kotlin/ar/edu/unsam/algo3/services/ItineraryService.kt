package ar.edu.unsam.algo3.services

import VariablesStub.itinerario
import com.fasterxml.jackson.module.kotlin.jacksonTypeRef
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.*

@Service
class ItineraryService {

    @Autowired
    lateinit var itineraryRepository:Repositorio<Itinerario>
    @Autowired
    lateinit var userService: UserService

    fun getItinerary(): MutableList<Itinerario> {
        return itineraryRepository.coleccion
    }

    fun getItineraryById(id:Int): Itinerario? {
        return itineraryRepository.getById(id)?: throw NotFoundException("No se encontró el itinerario de id <$id>")
    }

    fun updateItinerary(itinerarioJson:String): Itinerario {

        val itinerarioToUpdate = DEFAULT_MAPPER.readValue(itinerarioJson, jacksonTypeRef<Itinerario>())

        this.restoreDTOs(itinerarioJson,itinerarioToUpdate)

        itineraryRepository.update(itinerarioToUpdate)
        return getItineraryById(itinerarioToUpdate.id)!!
    }

    fun getItinerariesOfUser(user:Usuario): List<Itinerario> {
        return itineraryRepository.coleccion.filter { it.creador == user }
    }

    fun restoreDTOs(json:String, itinerary:Itinerario) {

        //Debido a que el itinerario pierde el crador y el creador de sus puntuaciones para evitar un loop infinito de deserializacion, se debe recontruir los dto antes de actualizar

        val jsonArray = JSONArray("[$json]")
        val jsonObject: JSONObject = jsonArray.getJSONObject(0)
        val creador = jsonObject.getJSONObject("creador")
        val idCreador:Int = creador.get("id") as Int

        itinerary.creador = userService.getUserById(idCreador)

        val puntuaciones = jsonObject.getJSONArray("puntuaciones")
        val creadoresYPuntuaciones = puntuaciones.map { it as JSONObject; CreadorYPuntuacion(it.getJSONObject("creador").get("id") as Int, it.get("numero") as Int)}

        val puntuacionesAAgregar = creadoresYPuntuaciones.map { Puntuacion(it.puntuacion,userService.getUserById(it.idCreador)) }

        itinerary.puntuaciones = puntuacionesAAgregar as MutableList<Puntuacion>

    }

}

data class CreadorYPuntuacion(
    val idCreador:Int,
    val puntuacion:Int
)