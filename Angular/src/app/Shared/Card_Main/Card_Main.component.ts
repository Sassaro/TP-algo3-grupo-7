import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { ProfileService } from './../../Services/Profile.service';
import { Itinerario } from "../../../Dominio/Itinerarios/Itinerarios"
import { Component, Input, OnInit } from '@angular/core';
import { faStar, faMap, faPen } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-Card_Main',
  templateUrl: './Card_Main.component.html',
  styleUrls: ['./Card_Main.component.css']
})
export class Card_MainComponent implements OnInit {

  @Input() itinerario!: Itinerario
  user!:Usuario
  faStar=faStar
  faMap=faMap
  faPen=faPen

  constructor(private route: ActivatedRoute, private dataService:ProfileService) { }

  ngOnInit() {
    this.getUser()
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

  async getUser() {
    this.user = await this.dataService.getUser( parseInt(this.getUserId()!!))
  }

  puedeEditar(){
    return this.itinerario.puedeModificarItinerario(this.user)
  }
  
}
