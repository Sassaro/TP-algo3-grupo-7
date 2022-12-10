package trabajoPracticoAlgoritmos2

import org.springframework.stereotype.Component
import org.webjars.NotFoundException

@Component
class Repositorio<T:ElementosDelRepositorio>(               // repositorio funciona como una coleccion de elementos que implementen
    val coleccion:MutableList<T> = mutableListOf(),         // la interfaz ElementosDelRepositorio
    var siguienteId: Int = 0
){

    fun create(elemento: T){                                 //añade un elemento a la coleccion y le asigna su id
        elemento.id = siguienteId
        siguienteId++
        coleccion.add(elemento)
    }

    fun delete(elemento: T){                                //elimina un elemento de la coleccion
        coleccion.remove(elemento)
    }

    fun update(elemento: T){
                                                                //actualiza un elemento de la lista, buscandolo por la id
        val elementoACambiar = this.getById(elemento.id)        // si el elemento no encuentra la id, debe devolver una excepcion

        if(elementoACambiar != null ){
            this.delete(elementoACambiar)
            coleccion.add(elemento)

        }else{
            throw org.uqbar.tareas.errors.NotFoundException("No se encontró la tarea de id <${elemento.id}>")
        }
    }

    fun getById(id:Int): T? {                             //busca un elemento por su id

        return coleccion.find { it.id == id }
    }

    fun search(texto:String):List<T>{                      //busca un elemento por texto

        return coleccion.filter { it.condicionDeBusqueda(texto) }

    }
}