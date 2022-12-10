import { Vehiculo } from 'src/Dominio/vehiculo/vehiculo';
import { VehiclesService } from './../../Services/Vehicles.service';
import { Selectivo, Combinado } from './../../../Dominio/Gustos/Gustos';
import { Usuario } from 'src/Dominio/Usuario/Usuario';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-Car_Brand_Selector',
  templateUrl: './Car_Brand_Selector.component.html',
  styleUrls: ['./Car_Brand_Selector.component.css']
})
export class Car_Brand_SelectorComponent implements OnInit {

  @Input() isOn:boolean = false
  @Input() user!:Usuario
  gustoSelectivo!:Selectivo
  vehicleList:Vehiculo[] = []
  
  constructor(private vehiclesService:VehiclesService) { }

  ngOnInit() {

  }

  ngOnChanges() {

    if(this.gustoSelectivo == null && this.isOn){
      this.getUserSelectivePreference()
    }
    this.getVehicles()

  }

  async getVehicles() {
    this.vehicleList =  await this.vehiclesService.getVehicles()
  }


  getUserSelectivePreference(){
    let aux = this.user.gustos as Combinado

    let gustoSelectivo =  aux.getGustoEnLista("Selectivo") as Selectivo

    this.gustoSelectivo = gustoSelectivo
  }

}
