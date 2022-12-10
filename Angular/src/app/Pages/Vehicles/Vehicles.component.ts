import { Vehiculo } from 'src/Dominio/vehiculo/vehiculo';
import { VehiclesService, StubVehiclesService } from './../../Services/Vehicles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Vehicles',
  templateUrl: './Vehicles.component.html',
  styleUrls: ['./Vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicleList: Array<Vehiculo> = []
  vehiculoBuscado=""

  constructor(private dataService:VehiclesService) { }

  ngOnInit() {

   this.getVehicles()

  }

  async getVehicles() {
    this.vehicleList = await this.dataService.getVehicles()
  }

  receiver(receivedFromChild:string){
    this.vehiculoBuscado = receivedFromChild
  }

}
