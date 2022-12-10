import { ActivatedRoute } from '@angular/router';
import { StubItineraryService } from '../../Services/Itinerary.service';
import { Component, OnInit } from '@angular/core';
import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';

@Component({
  selector: 'app-My_itineraries',
  templateUrl: './My_itineraries.component.html',
  styleUrls: ['./My_itineraries.component.css']
})
export class My_itinerariesComponent implements OnInit {

  itineraryList:Array<Itinerario> = []

  constructor(private dataService:ItineraryService, private route:ActivatedRoute) { }

  ngOnInit() {

    this.getItineraryList()

  }

  async getItineraryList(){

    this.itineraryList = await this.dataService.getItineraryByUserId( parseInt(this.route.snapshot.paramMap.get('userId')!!) )
  }

}