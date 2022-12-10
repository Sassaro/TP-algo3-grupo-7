import { StubItineraryService } from '../../Services/Itinerary.service';
import { Itinerario } from './../../../Dominio/Itinerarios/Itinerarios';
import { Component, OnInit } from '@angular/core';
import { ItineraryService } from 'src/app/Services/Itinerary.service';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css']
})
export class MainComponent implements OnInit {

  itineraryList:Array<Itinerario> = []
  itinerarioBuscado=""
  constructor(private dataService:ItineraryService) { }

  ngOnInit() {

    this.getItineraryList()

  }

  async getItineraryList(){

    this.itineraryList = await this.dataService.getItineraryList()
  }
  receiver(receivedFromChild:string){
    this.itinerarioBuscado = receivedFromChild
  }

}
