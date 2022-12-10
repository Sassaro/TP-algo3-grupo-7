package ar.edu.unsam.algo3.controller

import ar.edu.unsam.algo3.services.DestinationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import trabajoPracticoAlgoritmos2.Destino
import org.springframework.web.bind.annotation.PathVariable

@RestController
@CrossOrigin("*")
class DestinationController {

    @Autowired
    lateinit var destinationService: DestinationService

    @GetMapping("/prueba")      //ahy que ver bien cual debe ser la URL
    fun getDestination(): MutableList<Destino> {
        return destinationService.getDestination()
    }

    @GetMapping("/prueba/{id}")
    fun getDestinationById(@PathVariable id:Int): Destino? {
        return destinationService.getDestinationById(id)
    }

    @GetMapping("/searchDestination/")
    fun emptySearchDestination(): List<Destino> {
        return destinationService.getDestination()
    }

    @PatchMapping("/editarPrueba/{id}")
    fun updateDestination(@RequestBody updatedDestination:Destino): Destino? {
        destinationService.updateDestination(updatedDestination)
        return destinationService.getDestinationById(updatedDestination.id)
    }

    @PostMapping("/createDestination")
    fun createDestination(@RequestBody newDestination:Destino){
        this.destinationService.createDestination(newDestination)
    }

    @DeleteMapping("/deleteDestination/{id}")
    fun deleteDestination(@PathVariable id:Int){
        this.destinationService.deleteDestination(id)
    }

    @GetMapping("/searchDestination/{name}")
    fun searchDestination(@PathVariable name:String): List<Destino> {
        return destinationService.searchDestination(name)
    }
}