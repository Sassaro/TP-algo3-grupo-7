import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItinerarioJson, Itinerario } from '../../Dominio/Itinerarios/Itinerarios';
import { Usuario } from 'src/Dominio/Usuario/Usuario';
import { Injectable } from '@angular/core';
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades';
import { Relajado } from 'src/Dominio/Criterio/Criterio';
import { Destino } from 'src/Dominio/Destino/Destino';
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad';
import { Neofilo } from 'src/Dominio/Gustos/Gustos';
import { Puntuacion } from 'src/Dominio/Puntuaciones/Puntuacion';
import { REST_SERVER_URL } from './Configuration';
import { lastValueFrom } from 'rxjs';

export interface IItineraryService {

  getItineraryList():Array<Itinerario>
  getItineraryById(idToSearch:number):Itinerario | undefined
  getItineraryOfUser(user:Usuario):Itinerario | undefined

}

@Injectable({
  providedIn: 'root'
})

export class ItineraryService {

constructor(private httpClient:HttpClient) { }

  async getItineraryList(): Promise<Itinerario[]> {
    const itinerarios$ = this.httpClient.get<ItinerarioJson[]>(REST_SERVER_URL + '/main')
    const itinerarios = await lastValueFrom(itinerarios$)
    console.log("se ejecuta")
    return itinerarios.map((itinerarioJson) => Itinerario.fromJson(itinerarioJson))
  }

  async getItineraryById(id: number): Promise<Itinerario | undefined> {
    const itinerarioJson$ = this.httpClient.get<ItinerarioJson>(REST_SERVER_URL + '/main/' + id)
    const itinerarioJson = await lastValueFrom(itinerarioJson$)
    if (itinerarioJson === undefined) {
        throw new Error("No se encontro el Itinerario")
    }else{
      return Itinerario.fromJson(itinerarioJson)
    }
  }
  
  actualizarItinerario(itinerario: Itinerario) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.patch<ItinerarioJson>(REST_SERVER_URL + '/editItinerary/' + itinerario.id, itinerario.toJson(),{headers: headers})
    
  }

  async getItineraryByUserId(id: number): Promise<Itinerario[]> {
    const itinerarios$ = this.httpClient.get<ItinerarioJson[]>(REST_SERVER_URL + '/mainUser/' + id)
    const itinerarios = await lastValueFrom(itinerarios$)
    return itinerarios.map((itinerarioJson) => Itinerario.fromJson(itinerarioJson))
  }

}

@Injectable({
  providedIn: 'root'
})
export class StubItineraryService implements IItineraryService {

  constructor() { }

  getItineraryList():Array<Itinerario>{
    return lista
  }

  getItineraryById(idToSearch:number):Itinerario | undefined{
    return lista.find((aux)=> {return aux.id == idToSearch})
  }

  getItineraryOfUser(user:Usuario):Itinerario | undefined{
    return lista.find((aux)=> {return aux.creador === user})
  }

}

  // esto esta aca por ahora para probar un par de cosas
  const actividadSenderismo = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 10:30:00'),new Date('December 20, 2020 12:00:00'))
  const actividadSenderismo2 = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 8:00:00'),new Date('December 20, 2020 9:30:00'))
  const diaDeActividad = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
  const diaDeActividad2 = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
  const diaDeActividad3 = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
  const diaDeActividadVacio = new DiaDeActividad([])
  const relajado = new Relajado()
  const neofilo = new Neofilo()
  const usuario = new Usuario("armando","barreras","armanbarr",new Date('December 20, 2020 10:30:00'),"Argentina",10,[],[],relajado,neofilo,[])
  const destinoLocal = new Destino("Argentina","Bariloche", 1850)
  const destinoNoLocal = new Destino("Brazil","Petropolis", 1000)
  const destinoNoLocal2 = new Destino("Uruguay","Montevideo", 2500)
  const destinoNoLocal3 = new Destino("Italia","Roma", 3000)
  const destinoNoLocal4 = new Destino("Nicaragua","Managua", 1850)

  const puntuacion = new Puntuacion(10,usuario)
  const puntuacion1 = new Puntuacion(1,usuario)
  const puntuacion2 = new Puntuacion(2,usuario)
  const puntuacion3 = new Puntuacion(7,usuario)
  const puntuacion4 = new Puntuacion(3,usuario)
  
  const itinerario1 = new Itinerario(1,[diaDeActividad,diaDeActividadVacio],usuario,destinoNoLocal,[puntuacion,puntuacion2,puntuacion3])
  const itinerario2 = new Itinerario(2,[diaDeActividad,diaDeActividadVacio,diaDeActividad2,diaDeActividad3],usuario,destinoNoLocal2,[puntuacion,puntuacion])
  const itinerario3 = new Itinerario(3,[diaDeActividad,diaDeActividad2],usuario,destinoNoLocal3,[puntuacion,puntuacion,puntuacion3])
  const itinerario4 = new Itinerario(4,[diaDeActividad,diaDeActividadVacio,diaDeActividadVacio,diaDeActividadVacio],usuario,destinoNoLocal4,[])
  const itinerario5 = new Itinerario(5,[diaDeActividad,diaDeActividadVacio,diaDeActividadVacio],usuario,destinoLocal,[])

  const lista = [itinerario1,itinerario2,itinerario3,itinerario4,itinerario5]