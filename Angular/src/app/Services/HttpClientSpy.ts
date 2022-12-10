import { of } from 'rxjs'
import { Actividad, Dificultad } from 'src/Dominio/Actividades/Actividades'
import { Relajado } from 'src/Dominio/Criterio/Criterio'
import { Destino } from 'src/Dominio/Destino/Destino'
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad'
import { Neofilo } from 'src/Dominio/Gustos/Gustos'
import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios'
import { Puntuacion } from 'src/Dominio/Puntuaciones/Puntuacion'
import { Usuario } from 'src/Dominio/Usuario/Usuario'
import { REST_SERVER_URL } from './Configuration'

export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch'])

const actividadSenderismo = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 10:30:00'),new Date('December 20, 2020 12:00:00'))
const actividadSenderismo2 = new Actividad(100,"Senderismo",Dificultad.BAJA,new Date('December 20, 2020 8:00:00'),new Date('December 20, 2020 9:30:00'))
const diaDeActividad = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
const diaDeActividad2 = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
const diaDeActividad3 = new DiaDeActividad([actividadSenderismo,actividadSenderismo2])
const diaDeActividadVacio = new DiaDeActividad([])
const relajado = new Relajado()
const neofilo = new Neofilo()
const usuario = new Usuario("armando","barreras","armanbarr",new Date('December 20, 2020 10:30:00'),"Argentina",10,[],[],relajado,neofilo,[])
const usuario2 = new Usuario("Jose","Perez","Jope",new Date('December 20, 2018 10:30:00'),"Argentina",10,[],[],relajado,neofilo,[])
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
const itinerario3 = new Itinerario(3,[diaDeActividad,diaDeActividad2],usuario2,destinoNoLocal3,[puntuacion,puntuacion,puntuacion3])
const itinerario4 = new Itinerario(4,[diaDeActividad,diaDeActividadVacio,diaDeActividadVacio,diaDeActividadVacio],usuario2,destinoNoLocal4,[])
const itinerario5 = new Itinerario(5,[diaDeActividad,diaDeActividadVacio,diaDeActividadVacio],usuario,destinoLocal,[])

const lista = [itinerario1,itinerario2,itinerario3,itinerario4,itinerario5]

const listUser = [usuario,usuario2]
const listItinerary = [itinerario1,itinerario2,itinerario3,itinerario4,itinerario5]

httpClientSpy.get.withArgs(`${REST_SERVER_URL}/pruebaUser/1`).and.returnValue(of(usuario))
httpClientSpy.get.withArgs(`${REST_SERVER_URL}/pruebaUser`).and.returnValue(of(listUser))
httpClientSpy.get.withArgs(`${REST_SERVER_URL}/main`).and.returnValue(of(listItinerary))
httpClientSpy.get.withArgs(`${REST_SERVER_URL}/main/1`).and.returnValue(of(itinerario1))
httpClientSpy.get.withArgs(`${REST_SERVER_URL}/mainUser/1`).and.returnValue(of([itinerario1,itinerario2,itinerario3]))