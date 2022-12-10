import { DiaDeActividadJson } from './../DiaDeActividad/DiaDeActividad';
import { DiaDeActividad } from 'src/Dominio/DiaDeActividad/DiaDeActividad';
import { Puntuacion } from './../Puntuaciones/Puntuacion';
import { DestinoJson } from './../Destino/Destino';
import { UsuarioJson } from './../Usuario/Usuario';
import { Actividad, Dificultad } from "../Actividades/Actividades";
import { Destino } from "../Destino/Destino";
import { Usuario } from "../Usuario/Usuario";
import { Relajado } from '../Criterio/Criterio';
import { Neofilo } from '../Gustos/Gustos';

export type ItinerarioJson = {

    id:number
    diasDeActividad:Array<DiaDeActividadJson>
    creador:Usuario
    destino:DestinoJson
    puntuaciones:Array<Puntuacion>

}

export class Itinerario{

    id!:number
    readonly diasDeActividad:Array<DiaDeActividad> = []
    readonly creador:Usuario
    destino:Destino
    readonly puntuaciones:Array<Puntuacion> = []

    constructor(_id:number = -1, _diasDeActividad:Array<DiaDeActividad> = [],_creador:Usuario = new Usuario("","","",new Date(),"",0,[],[],new Relajado(),new Neofilo(),[]), _destino:Destino = new Destino(),_puntaciones:Array<Puntuacion> = []){
        this.id = _id;
        this.diasDeActividad = _diasDeActividad
        this.creador = _creador
        this.destino = _destino
        this.puntuaciones = _puntaciones
    }

    static fromJson(itinerarioJson:ItinerarioJson){
        return Object.assign(new Itinerario(),itinerarioJson,{diasDeActividad: itinerarioJson.diasDeActividad.map( (diaDeActividadJson) => { return DiaDeActividad.fromJson(diaDeActividadJson)}),destino: Destino.fromJson(itinerarioJson.destino)})
    }

    toJson():ItinerarioJson{
        let aux = {
            id: this.id,
            diasDeActividad: this.diasDeActividad.map( (diaDeActividad) => {return diaDeActividad.toJson()}),
            creador: this.creador,
            destino: this.destino,
            puntuaciones: this.puntuaciones
        }
        return aux
    }

    getAvgScore():number{

        const aux = this.puntuaciones.reduce((acc, puntuacion:Puntuacion)=>{return acc + puntuacion.numero },0)/this.puntuaciones.length/2

        if(Number.isNaN(aux)){
            return 0
        }else{
            return aux
        }

    }

    getScoreArray():Array<number>{
        return Array.from(Array(this.getAvgScore() | 0).keys()).map(x => x + 1);
    }

    getEmptyScoreArray(){
       const aux = ((this.getAvgScore() | 0) -5) * -1
       return Array.from(Array(aux).keys()).map(x => x + 1);
    }

    cantidadDeDias():number{
        return this.diasDeActividad.length
    }

    actividadesEnElItinerario():Array<Actividad>{
        return this.diasDeActividad.flatMap((diaDeActividad)=>{return diaDeActividad.actividades})
    }

    duracionPromedioPorDia():number{

        const duracionActividadesPorDia = this.diasDeActividad.map((diaDeActividad)=>{return diaDeActividad.tiempoDeActividadEnElDia()})
        return duracionActividadesPorDia.reduce((acc,duracion)=>{return acc + duracion},0)/this.cantidadDeDias()
    }

    dificultad():Dificultad{

        const actividadesEnElItinerario = this.actividadesEnElItinerario()

        const cantBaja = actividadesEnElItinerario.filter((actividad)=>{return actividad.dificultad === Dificultad.BAJA})
        const cantMedia = actividadesEnElItinerario.filter((actividad)=>{return actividad.dificultad === Dificultad.MEDIA})
        const cantAlta = actividadesEnElItinerario.filter((actividad)=>{return actividad.dificultad === Dificultad.ALTA})

        if (cantAlta >= cantMedia && cantAlta >= cantBaja) {
            return Dificultad.ALTA
        } else if (cantMedia >= cantBaja) {
            return Dificultad.MEDIA
        } else {
            return Dificultad.BAJA
        }

    }

    costoDelItinerario():number{
        
        const costoActividadesItinerario = this.actividadesEnElItinerario().map((actividad)=>{return actividad.costo})
        return costoActividadesItinerario.reduce((acc, costo)=>{return acc + costo},0) + this.destino.calcularCostoBase()
    }

    agregarActividadAItinerario(numeroDeDia:number,actividad: Actividad):void {
        this.diasDeActividad[numeroDeDia].agregarActividadAlDia(actividad)
    }

    agregarDiaDeActividad():void {
        this.diasDeActividad.push(new DiaDeActividad([]))
    }

    quitarDiaDeActividad(diaDeActividad:DiaDeActividad){
        const index = this.diasDeActividad.indexOf(diaDeActividad, 0);
        if (index > -1) {
            this.diasDeActividad.splice(index, 1);
        }
    }

    tienePuntuacionesRepetidas():boolean{
        const listaDeCreadoresDePuntuaciones = this.puntuaciones.map((puntuacion)=>{puntuacion.creador})
        return (new Set(listaDeCreadoresDePuntuaciones)).size != listaDeCreadoresDePuntuaciones.length
    }

    tienePuntuacionesNoValidas(): boolean {
        return this.puntuaciones.some((puntuacion)=>{return !puntuacion.validacion()})
    }

    puedeModificarItinerario(usuario: Usuario):boolean{

        let friendsIds = usuario.amigos.map( it => it.id )
        return this.creador.id == usuario.id || friendsIds.includes(this.creador.id)
    }

    agregarPuntuacion(puntuacion: Puntuacion){
        this.puntuaciones.push(puntuacion)
    }

    porcentajeDificultadDeActividad(dificultad: Dificultad):number{
        const actividadesEnElItinerario = this.actividadesEnElItinerario()
        return (actividadesEnElItinerario.filter((actividad)=>{return actividad.dificultad === dificultad}).length/actividadesEnElItinerario.length)*100
    }

    contiene(palabra: string): boolean {
        return ( this.destino.pais.toUpperCase().concat(" " + this.destino.ciudad.toUpperCase()) || "").includes(palabra.toUpperCase())
    }
}