package ar.edu.unsam.algo3.controllers

import ar.edu.unsam.algo3.services.ItineraryService
import ar.edu.unsam.algo3.services.UserService
import com.fasterxml.jackson.module.kotlin.jacksonTypeRef
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import trabajoPracticoAlgoritmos2.*

@RestController
@CrossOrigin("*")
class ItineraryController {

    @Autowired
    lateinit var itineraryService: ItineraryService
    @Autowired
    lateinit var userService: UserService

    @GetMapping("/main")
    fun getItineraries():List<Itinerario>{
        return itineraryService.getItinerary()
    }

    @GetMapping("/main/{id}")
    fun getItineraryById(@PathVariable id:Int): Itinerario? {
        return itineraryService.getItineraryById(id)
    }

    @GetMapping("/mainUser/{id}")
    fun getItineraryByUserId(@PathVariable id:Int): List<Itinerario> {
        return  itineraryService.getItinerariesOfUser(userService.getUserById(id)!!)
    }

    @PatchMapping("/editItinerary/{id}")
    fun updateItinerary(@RequestBody updatedItineraryJson:String ): Itinerario {

        return itineraryService.updateItinerary(updatedItineraryJson)
    }

}