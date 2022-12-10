package trabajoPracticoAlgoritmos2

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

class Puntuacion (
    val numero:Int,
    @JsonIgnore
    val creador: Usuario?
    ){

    @JsonProperty("creador")
    fun getCreatorAsString(): UsuarioDTO? {
        return creador?.let { UsuarioDTO(it.id,creador.nombre, creador.apellido, creador.username,creador.paisDeResidencia) }
    }

    fun validacion():Boolean{
        if(numero < 1 || numero > 10){
            return false
        }
        return true
    }
}