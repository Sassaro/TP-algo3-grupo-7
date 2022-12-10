import { ItineraryService } from 'src/app/Services/Itinerary.service';
import { Usuario } from 'src/Dominio/Usuario/Usuario';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/Services/Profile.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DestinationService } from 'src/app/Services/Destination.service';
import { Destino } from 'src/Dominio/Destino/Destino';
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { mostrarError } from 'src/Utils/GlobalErrorHandler';

@Component({
  selector: 'app-Add_Score_Menu',
  templateUrl: './Add_Score_Menu.component.html',
  styleUrls: ['./Add_Score_Menu.component.css']
})
export class Add_Score_MenuComponent implements OnInit {

  selectedValue!:string
  user!:Usuario
  errors = []
  @Input() itinerario!:Itinerario
  @Input() isOn:boolean = false
  @Output() onClick = new EventEmitter<boolean>();

  constructor(private userService:ProfileService,private itineraryService:ItineraryService ,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getUser()
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

  async getUser() {
    this.user = await this.userService.getUser( parseInt(this.getUserId()!!))
  }

  close(){
    this.onClick.emit(false)
  }

  accept(){
    try {
      this.user.puntuarItinerario(this.itinerario,parseInt(this.selectedValue))
      this.itineraryService.actualizarItinerario(this.itinerario).subscribe()
      this.close()
    } catch (error) {
      mostrarError(this, error)
    }
  }
}
