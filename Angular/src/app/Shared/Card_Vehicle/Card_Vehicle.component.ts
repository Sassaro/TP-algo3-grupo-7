import { Component, Input, OnInit } from '@angular/core';
import { Camioneta, Vehiculo } from 'src/Dominio/vehiculo/vehiculo';

@Component({
  selector: 'app-Card_Vehicles',
  templateUrl: './Card_Vehicle.component.html',
  styleUrls: ['./Card_Vehicle.component.css']
})
export class Card_VehicleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() vehiculo!:Vehiculo

}
