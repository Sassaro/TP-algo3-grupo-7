import { Destino } from 'src/Dominio/Destino/Destino';
import { DestinationService } from './../../Services/Destination.service';
import { Router } from '@angular/router';
import { Itinerario } from "../../../Dominio/Itinerarios/Itinerarios"
import { Component, Input, OnInit } from '@angular/core';
import { faMap } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-Navigation',
  templateUrl: './Navigation.component.html',
  styleUrls: ['./Navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() itinerary!: Itinerario
  faMap=faMap

  constructor(public router:Router,private destinationService:DestinationService) { }

  destinationList:Destino[] = []

  ngOnInit() {
    this.obtenerTodosLosDestinos()
  }

  async obtenerTodosLosDestinos() {
    this.destinationList = await this.destinationService.getDestinationList()
  }
}
