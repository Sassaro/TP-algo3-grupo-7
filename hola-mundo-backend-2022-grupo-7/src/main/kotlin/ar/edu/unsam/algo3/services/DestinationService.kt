package ar.edu.unsam.algo3.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.Destino
import trabajoPracticoAlgoritmos2.Repositorio

@Service
class DestinationService {

    @Autowired
    lateinit var destinationRepository: Repositorio<Destino>

    fun getDestination(): MutableList<Destino> {
        return destinationRepository.coleccion
    }

    fun getDestinationById(id:Int): Destino? {
        return destinationRepository.getById(id)?: throw NotFoundException("No se encontró el destino de id <$id>")
    }

    fun searchDestination(nombre: String): List<Destino> {
        return destinationRepository.search(nombre)
    }

    fun updateDestination(updatedDestination:Destino): Destino {
        destinationRepository.update(updatedDestination)
        return updatedDestination
    }

    fun createDestination(newDestination: Destino){
        this.destinationRepository.create(newDestination)
    }

    fun deleteDestination(id: Int) {
        val destinationToDelete = this.destinationRepository.getById(id)
        if(destinationToDelete != null){
            this.destinationRepository.delete(destinationToDelete)
        }else{
            throw BusinessException("No se encontro el destino a borrar")
        }
    }

}