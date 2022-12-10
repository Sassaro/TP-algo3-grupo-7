package ar.edu.unsam.algo3.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.uqbar.tareas.errors.BusinessException
import org.uqbar.tareas.errors.NotFoundException
import trabajoPracticoAlgoritmos2.Repositorio
import trabajoPracticoAlgoritmos2.Vehiculo

@Service
class VehicleService {

    @Autowired
    lateinit var VehicleRepository: Repositorio<Vehiculo>

    fun getVehicle(): MutableList<Vehiculo> {
        return VehicleRepository.coleccion
    }

    fun getVehicleId(id:Int): Vehiculo? {
        return VehicleRepository.getById(id)?: throw NotFoundException("No se encontró el vehiculo de id <$id>")
    }

    fun createVehicle(vehiculo: Vehiculo){
        VehicleRepository.create(vehiculo)
    }

    fun updateVehicle(newVehicle: Vehiculo) {
        this.VehicleRepository.update(newVehicle)
    }

    fun deleteVehicle(id: Int) {

        val vehicleToDelete = this.VehicleRepository.getById(id)

        if(vehicleToDelete != null){
            this.VehicleRepository.delete(vehicleToDelete)
        }else{
            throw BusinessException("No se encontro el Vehiculo en el repositorio")
        }
    }

    fun searchVehicle(value: String): List<Vehiculo> {
        return this.VehicleRepository.search(value)
    }
}