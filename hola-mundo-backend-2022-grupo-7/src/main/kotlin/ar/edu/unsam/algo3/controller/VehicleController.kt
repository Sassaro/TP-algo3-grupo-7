package ar.edu.unsam.algo3.controllers

import ar.edu.unsam.algo3.services.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import trabajoPracticoAlgoritmos2.Vehiculo

@RestController
@CrossOrigin("*")
class VehicleController{

    @Autowired
    lateinit var vehicleService: VehicleService

    @GetMapping("/vehicles")
    fun getVehicles(): MutableList<Vehiculo>{
        return vehicleService.getVehicle()
    }

    @GetMapping("/vehicles/{id}")
    fun getVehiclesById(@PathVariable id: Int): Vehiculo?{
        return vehicleService.getVehicleId(id)
    }

    @GetMapping("/searchVehicles/{value}")
    fun searchVehicles(@PathVariable value: String): List<Vehiculo> {
        return vehicleService.searchVehicle(value)
    }

    @GetMapping("/searchVehicles/")
    fun emptySearchVehicles(): List<Vehiculo> {
        return vehicleService.getVehicle()
    }

    @PostMapping("/createVehicle")
    fun createNewVehicle(@RequestBody newVehicleJson:Vehiculo){
        this.vehicleService.createVehicle(newVehicleJson)
    }

    @PatchMapping("/updateVehicle")
    fun updateVehicle(@RequestBody newVehicle:Vehiculo){
        this.vehicleService.updateVehicle(newVehicle)
    }

    @DeleteMapping("/deleteVehicle/{id}")
    fun deleteVehicle(@PathVariable id: Int){
        this.vehicleService.deleteVehicle(id)
    }

}