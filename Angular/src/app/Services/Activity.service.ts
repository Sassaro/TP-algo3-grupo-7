import { HttpClient } from '@angular/common/http';
import { Actividad, ActividadJson } from './../../Dominio/Actividades/Actividades';
import { Injectable } from '@angular/core';
import { REST_SERVER_URL } from './Configuration';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

constructor(private httpClient:HttpClient) { }

async getActivityList():Promise<Actividad[]> {
  const actividades$ = this.httpClient.get<ActividadJson[]>(REST_SERVER_URL + '/activities')
  const actividades = await lastValueFrom(actividades$)
  return actividades.map((actividadJson) => Actividad.fromJson(actividadJson))
}

}
