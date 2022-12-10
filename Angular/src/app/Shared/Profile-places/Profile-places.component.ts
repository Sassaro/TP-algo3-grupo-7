import { Destino } from 'src/Dominio/Destino/Destino';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Profile-places',
  templateUrl: './Profile-places.component.html',
  styleUrls: ['./Profile-places.component.css']
})
export class ProfilePlacesComponent implements OnInit {

  @Input() wanted!: boolean
  @Input() destinationList!: Array<Destino>
  isOn:boolean = false

  constructor() { }

  ngOnInit() {
  }

  
  showDestinationMenu(){
    this.isOn = true
  }

}
