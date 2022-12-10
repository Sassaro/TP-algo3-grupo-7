import { StubItineraryService } from '../../Services/Itinerary.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';

@Component({
  selector: 'app-Edit_itinerary',
  templateUrl: './Edit_itinerary.component.html',
  styleUrls: ['./Edit_itinerary.component.css']
})
export class Edit_itineraryComponent implements OnInit {
  itinerary!:Itinerario
  aux:boolean = false

  constructor(private itineraryService:ItineraryService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.getItinerary()
  }

  getItinerary(){
    this.route.params.subscribe(async (itineraryParameters) => {
      const itinerario = await this.itineraryService.getItineraryById(itineraryParameters['id'])
      if (!itinerario) {
        this.returnToMain()
      } else {
        this.itinerary = itinerario
      }
    })
  }

  actualizarItinerario(){
    this.itineraryService.actualizarItinerario(this.itinerary).subscribe()
  }

  updateItineraryButton(){
    this.actualizarItinerario()
    this.aux = true
    setTimeout(() => {
      this.aux = false
    }, 3000)
  }

  returnToMain(){
    this.router.navigate(['/main'])
  }

  agregarDiaDeActividad(){
    
    this.itinerary.agregarDiaDeActividad()
    this.actualizarItinerario()
  }

}
