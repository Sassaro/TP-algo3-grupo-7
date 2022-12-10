import { Itinerario } from './../../../Dominio/Itinerarios/Itinerarios';
import { Actividad } from 'src/Dominio/Actividades/Actividades';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-Container_Itinerary',
  templateUrl: './Container_Itinerary.component.html',
  styleUrls: ['./Container_Itinerary.component.css']
})
export class Container_ItineraryComponent implements OnInit {

  constructor(public router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
  }

  deleteActivity(activity:Actividad){
    this.activityDay.quitarActividadDelDia(activity)
  }

  deleteActivityDay(activityDay:DiaDeActividad){
    this.itinerary.quitarDiaDeActividad(activityDay)
  }

  @Input() activityDay!: DiaDeActividad
  @Input() itinerary!: Itinerario
  @Input() day!:number

  faTrashCan=faTrashCan

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

}
