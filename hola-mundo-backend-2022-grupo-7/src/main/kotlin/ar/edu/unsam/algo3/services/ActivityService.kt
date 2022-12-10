package ar.edu.unsam.algo3.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.Actividad
import trabajoPracticoAlgoritmos2.Repositorio

@Service
class ActivityService {

    @Autowired
    lateinit var activityRepository: Repositorio<Actividad>

    fun getActivity(): MutableList<Actividad> {
        return activityRepository.coleccion
    }

    fun getActivityById(id: Int): Actividad? {
        return activityRepository.getById(id) ?: throw NotFoundException("No se encontró el destino de id <$id>")
    }

    fun createActivity(actividad: Actividad){
        this.activityRepository.create(actividad)
    }

    fun deleteActivity(id:Int){
        val activityToDelete = this.activityRepository.getById(id)
        if(activityToDelete != null){
            this.activityRepository.delete(activityToDelete)
        }else{
            throw BusinessException("No se encontro la actividad a borrar")
        }
    }

    fun updateActivity(updatedActivity: Actividad) {
        activityRepository.update(updatedActivity)
    }

    fun searchActivity(value: String): List<Actividad> {
        return activityRepository.search(value)
    }

}