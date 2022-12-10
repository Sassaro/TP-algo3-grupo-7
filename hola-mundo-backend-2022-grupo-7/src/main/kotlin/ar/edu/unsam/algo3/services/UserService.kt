package ar.edu.unsam.algo3.services

import com.fasterxml.jackson.module.kotlin.jacksonTypeRef
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.DEFAULT_MAPPER
import trabajoPracticoAlgoritmos2.Itinerario
import trabajoPracticoAlgoritmos2.Repositorio
import trabajoPracticoAlgoritmos2.Usuario

@Service
class UserService {

    @Autowired
    lateinit var userRepository: Repositorio<Usuario>
    @Autowired
    lateinit var itineraryRepository: Repositorio<Itinerario>

    fun getUser(): MutableList<Usuario> {
        return userRepository.coleccion
    }

    fun getUserById(id:Int): Usuario? {
        return userRepository.getById(id)?: throw NotFoundException("No se encontró el usuario de id <$id>")
    }

    fun updateUser(updatedUserJson:String): Usuario {

        val userToUpdate = DEFAULT_MAPPER.readValue(updatedUserJson, jacksonTypeRef<Usuario>())

        this.restoreDTOs(updatedUserJson,userToUpdate)

        userRepository.update(userToUpdate)
        return userToUpdate
    }

    fun searchUserByUsername(username: String): List<Usuario> {
        return this.userRepository.search(username)
    }

    fun getUserInformation(id: Int): UserInformation {

        val user = this.getUserById(id)
        if(user == null){
            throw BusinessException("El usuario recibido no existe")
        }else{
            val itinerariesScoredByUser = this.getItinerariesScoredByUser(this.itineraryRepository.coleccion, user)
            val itinerariesCreatedByUser = this.getItinerariesCreatedByUser(this.itineraryRepository.coleccion, user)

            return UserInformation(itinerariesScoredByUser, itinerariesCreatedByUser, user.amigos.size, user.destinosVisitados.size)
        }
    }

    private fun restoreDTOs(usuarioJson:String, user:Usuario){

        val jsonArray = JSONArray("[$usuarioJson]")
        val jsonObject: JSONObject = jsonArray.getJSONObject(0)
        val amigos = jsonObject.getJSONArray("amigos")

        val idDeAmigos = amigos.map { it as JSONObject; it.get("id") }

        val amigosAAgregar = idDeAmigos.map { this.getUserById(it as Int) }

        user.amigos = amigosAAgregar as MutableList<Usuario>
    }

    private fun getItinerariesScoredByUser(itinerarios: MutableList<Itinerario>,user:Usuario): Int {
        return itinerarios.count { it -> it.puntuaciones.map { it.creador }.contains(user) }
    }

    private fun getItinerariesCreatedByUser(itinerarios: MutableList<Itinerario>,user:Usuario): Int {
        return itinerarios.count { it -> it.creador == user }
    }
}

data class UserInformation(
        val itinerariosPuntuados:Int,
        val itinerariosCreados:Int,
        val destinosVisitados:Int,
        val amigos:Int
)