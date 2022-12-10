import { ActividadJson } from './../Actividades/Actividades';
import {Actividad} from "../Actividades/Actividades"
import { FuncionesDeTiempo } from "../Utils/Funciones/ManejoTiempo";
import { map } from 'rxjs';

export type DiaDeActividadJson  = {

    actividades:Array<ActividadJson>

}

export class DiaDeActividad{
    actividades:Array<Actividad>

    constructor(actividades:Array<Actividad>){
        this.actividades= actividades;
    }

    static fromJson(diaDeActividadJson:DiaDeActividadJson){
        return Object.assign(new DiaDeActividad([]),diaDeActividadJson, { actividades: diaDeActividadJson.actividades.map( (actividad) => {return Actividad.fromJson(actividad) } ) });
    }

    toJson(): DiaDeActividadJson{
        return {
            actividades:this.actividades.map( (actividad) => {return actividad.toJson()})
        }
    }

    tiempoDeActividadEnElDia():number{
        const duracionActividades = this.actividades.map((actividad)=>{return actividad.duracionActividad()})
        const sumaTiempo = duracionActividades.reduce((acc, val) =>{return acc + val},0)
        return sumaTiempo
    }

    agregarActividadAlDia(actividad: Actividad) {
    
         if (this.solapaEstaActividad(actividad, this.actividades)) {
            throw new Error("No se pueden agregar actividades Solapadas")
         } else {
            this.actividades.push(actividad)
        }
    }

    quitarActividadDelDia(actividad: Actividad) {
        
        const index = this.actividades.indexOf(actividad, 0);
        if (index > -1) {
            this.actividades.splice(index, 1);
        }
    }


    estaVacio():boolean{
        return !this.actividades.length
    }


    tieneActividadesSolapadas():boolean{
       if (this.estaVacio()) {
            return false}
        return this.actividades.some(actividad => {
            let auxActividades = this.actividades.filter(x => x != actividad)
            this.solapaEstaActividad(actividad, auxActividades)
        })
    }

    solapaEstaActividad(actividad: Actividad, listaDeActividades:Array<Actividad>): boolean {
        return listaDeActividades.some((actividadEnLista)=>{
            return this.comparacionDeActividades(actividad,actividadEnLista)
        })
    }

    comparacionDeActividades(actividad1: Actividad, actividad2: Actividad):boolean{
        return (actividad1.inicio.getTime() == actividad2.inicio.getTime()) ||           
         (actividad1.fin.getTime() == actividad2.fin.getTime()) ||
        this.estanParcialmenteSolapadas(actividad1,actividad2) 
    }

    estanParcialmenteSolapadas(actividad1: Actividad, actividad2: Actividad):boolean{

        return this.estaEnMedio(actividad1.inicio,actividad1.fin,actividad2.inicio) || 
        this.estaEnMedio(actividad1.inicio,actividad1.fin,actividad2.fin) ||
        this.estaAnidada(actividad1.inicio,actividad1.fin,actividad2.inicio,actividad2.fin)

    }

    estaEnMedio(inicio:Date,fin:Date,valor:Date):boolean{    
       return FuncionesDeTiempo.esDespues(valor,inicio) && FuncionesDeTiempo.esAntes(valor,fin)
    }

    estaAnidada(inicio:Date,fin:Date,inicio2:Date,fin2:Date):boolean{    
        return FuncionesDeTiempo.esDespues(inicio,inicio2) && FuncionesDeTiempo.esAntes(fin,fin2)
     }
}
