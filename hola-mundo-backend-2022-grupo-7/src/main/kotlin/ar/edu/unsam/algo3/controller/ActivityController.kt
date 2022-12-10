package ar.edu.unsam.algo3.controller

import ar.edu.unsam.algo3.services.ActivityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import trabajoPracticoAlgoritmos2.Actividad
import trabajoPracticoAlgoritmos2.Destino
import trabajoPracticoAlgoritmos2.Vehiculo

@RestController
@CrossOrigin("*")
class ActivityController {

    @Autowired
    lateinit var activityService: ActivityService

    @GetMapping("/activities")
    fun getActivities(): MutableList<Actividad> {
        return activityService.getActivity()
    }

    @GetMapping("/activities/{id}")
    fun getActivityById(@PathVariable id: Int): Actividad? {
        return activityService.getActivityById(id)
    }

    @GetMapping("/searchActivities/{value}")
    fun searchActivity(@PathVariable value: String): List<Actividad> {
        return activityService.searchActivity(value)
    }

    @GetMapping("/searchActivities/")
    fun emptySearchActivity(): List<Actividad> {
        return activityService.getActivity()
    }

    @PostMapping("/createActivity")
    fun createNewActivity(@RequestBody newActivity: Actividad){
        this.activityService.createActivity(newActivity)
    }

    @DeleteMapping("/deleteActivity/{id}")
    fun deleteActivity(@PathVariable id: Int){
        this.activityService.deleteActivity(id)
    }

    @PatchMapping("/updateActivity")
    fun updateActivity(@RequestBody updatedActivity: Actividad){
        this.activityService.updateActivity(updatedActivity)
    }

}