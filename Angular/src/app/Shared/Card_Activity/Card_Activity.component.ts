import { Router, ActivatedRoute } from '@angular/router';
import { ItineraryService } from './../../Services/Itinerary.service';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { Component, Input, OnInit } from '@angular/core';
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades';
import { faClock, faCircle, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { mostrarError } from 'src/Utils/GlobalErrorHandler';



@Component({
  selector: 'app-Card_Activity',
  templateUrl: './Card_Activity.component.html',
  styleUrls: ['./Card_Activity.component.css']
})
export class Card_ActivityComponent implements OnInit {

  @Input() Actividad!: Actividad;
  @Input() itinerary!: Itinerario;
  @Input() activityDay!: number;
  dificultad = Dificultad;
  errors = []
  faClock = faClock
  faLocationDot = faLocationDot
  faCircle = faCircle
  faCircleRegular = faCircleRegular

  constructor(private itineraryService:ItineraryService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }
  
  addActivity(){

    if(this.itinerary){
      try{
        this.itinerary.agregarActividadAItinerario(this.activityDay,this.Actividad)
        this.actualizarItinerario()
        this.goBack()
      }catch(error){
        mostrarError(this, error)
      }
    }
  }

  actualizarItinerario(){
    this.itineraryService.actualizarItinerario(this.itinerary).subscribe()
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

  goBack(){
    this.router.navigate([this.getUserId() + "/editItinerary/" + this.itinerary.id])
  }

}
