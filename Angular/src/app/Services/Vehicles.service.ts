import { Destino } from 'src/Dominio/Destino/Destino';
import { Moto, Auto, VehiculoJSON} from './../../Dominio/vehiculo/vehiculo';
import { Injectable } from '@angular/core';
import { Camioneta, Vehiculo} from 'src/Dominio/vehiculo/vehiculo';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from './Configuration';
import { lastValueFrom } from 'rxjs';


export interface IVehiclesService {

  getVehicles():Array<Vehiculo>

}

@Injectable({
  providedIn: 'root'
})

export class VehiclesService /*implements IVehiclesService*/ {

  constructor(private httpClient: HttpClient) { }

  async getVehicles() {
    const vehicles$ = this.httpClient.get<VehiculoJSON[]>(REST_SERVER_URL + '/vehicles')
    const vehicles = await lastValueFrom(vehicles$)
    
    return vehicles.map(venicleJSON => {return Vehiculo.fromJson(venicleJSON)})
  }

}

@Injectable({
  providedIn: 'root'
})


export class StubVehiclesService implements IVehiclesService {

  getVehicles(): Array<Vehiculo>{
    return vehicleList
   }

}

const vehicle1 = new Camioneta("Fiat", "fiorino", new Date(),18000,false,false,false)
const vehicle2 = new Moto("Honda", "GLH 150", new Date(),10000,100,false,false)
const vehicle3 = new Camioneta("Renault", "Duster", new Date(),18000,false,true,false)
const vehicle4 = new Auto("Ford", "Falcon", new Date(),15000,false,false,false)
const vehicle5 = new Camioneta("Renault", "Kwid", new Date(),20000,false,true,false)
const vehicle6 = new Camioneta("Fiat", "fiorino", new Date(),15000,false,false,false)
const vehicleList = [ vehicle1, vehicle2, vehicle3, vehicle4,vehicle5,vehicle6 ] 