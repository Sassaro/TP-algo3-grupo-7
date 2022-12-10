import { ActivatedRoute, Router } from '@angular/router';
import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { ActivityService } from './../../Services/Activity.service';
import { Component, Input, OnInit } from '@angular/core';
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades';
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad';

@Component({
  selector: 'app-Activities',
  templateUrl: './Activities.component.html',
  styleUrls: ['./Activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(private activityService:ActivityService, private itineraryService:ItineraryService, private route:ActivatedRoute, private router:Router) { }

  actividadBuscada= ""
  activityList:Array<Actividad> = []
  itinerary!:Itinerario
  activityDay!:number

  ngOnInit() {

    this.getActivityList()
    this.getItinerary()
    this.activityDay = parseInt(this.route.snapshot.paramMap.get('activityDay')!!);
  }

  async getActivityList(){

    this.activityList = await this.activityService.getActivityList()
  }

  
  async getItinerary(){

    this.route.params.subscribe(async (itineraryParameters) => {
      const itinerario = await this.itineraryService.getItineraryById(itineraryParameters['itineraryId'])
      if (!itinerario) {
        this.returnToMain()
      } else {
        this.itinerary = itinerario
      }
    })
  }

  returnToMain(){
    this.router.navigate([this.getUserId() + "/editItinerary/" + this.itinerary.id])
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

  receiver(receivedFromChild:any){
    this.actividadBuscada = receivedFromChild
  }

}
