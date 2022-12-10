import { StubItineraryService } from './../../Services/Itinerary.service';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { ActivatedRoute, Router } from '@angular/router';
import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Itinerary',
  templateUrl: './Itinerary.component.html',
  styleUrls: ['./Itinerary.component.css']
})
export class ItineraryComponent implements OnInit {

  itinerary!:Itinerario
  isOn:boolean = false

  constructor(private itineraryService:ItineraryService, public router:Router, private route:ActivatedRoute ) { }

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

  returnToMain(){
    this.router.navigate(['/main'])
  }

  showMenu(){
    this.isOn = true
  }

}
