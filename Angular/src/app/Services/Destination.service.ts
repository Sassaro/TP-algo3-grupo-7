import { Destino, DestinoJson } from './../../Dominio/Destino/Destino';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { REST_SERVER_URL } from './Configuration';
import { lastValueFrom } from 'rxjs';


export interface IDestinationService {

}

@Injectable({
  providedIn: 'root'
})

export class DestinationService {

constructor(private httpClient: HttpClient) { }

async getDestinationList():Promise<Destino[]> {
  const destinos$ = this.httpClient.get<DestinoJson[]>(REST_SERVER_URL + '/prueba')
  const destinos = await lastValueFrom(destinos$)
  console.log("se ejecuta")
  return destinos.map((destinoJSON) => Destino.fromJson(destinoJSON))
}

}
