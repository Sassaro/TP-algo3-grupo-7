import { Relajado, Precavido, CriterioJson } from './../Criterio/Criterio';
import { Neofilo, SinLimite, Combinado, Supersticioso, Caprichoso, Selectivo, GustoJson } from './../Gustos/Gustos';
import {Destino} from "../Destino/Destino"
import {Itinerario} from "../Itinerarios/Itinerarios"
import {Criterio} from "../Criterio/Criterio"
import {Gusto} from "../Gustos/Gustos"
import { FuncionesDeTiempo } from "../Utils/Funciones/ManejoTiempo"
import { Puntuacion } from "../Puntuaciones/Puntuacion"
import { Vehiculo } from "../vehiculo/vehiculo"
import { Actividad } from "../Actividades/Actividades"
import { DiaDeActividad } from "../DiaDeActividad/DiaDeActividad"


export type UsuarioJson = {

    id:number
    nombre:string;
    apellido:string;
    username: string;
    paisDeResidencia: string;
    destinosDeseados: Array<Destino>;
    destinosVisitados:Array<Destino>,
    gustos:GustoJson,
    criterio:CriterioJson,
    diasParaViajar:number,
    fechaDeAlta:Date,
    itinerarios:Array<Itinerario>,
}

export class Usuario{ 

    id:number = -1
    nombre:string
    apellido:string
    username:string
    paisDeResidencia:string
    destinosDeseados:Array<Destino>= []
    gustos:Gusto
    fechaDeAlta:Date
    diasParaViajar:number
    amigos:Array<Usuario>= []
    destinosVisitados:Array<Destino> = []
    criterio:Criterio
    itinerarios:Array<Itinerario> = []
    contrasenia:string

    constructor(nombre:string, apellido:string, username:string, fechaDeAlta:Date, paisDeResidencia:string, diasParaViajar:number, destinosDeseados:Array<Destino>,destinosVisitados:Array<Destino>, criterio:Criterio, gustos:Gusto, _amigos:Array<Usuario>, contrasenia:string = ""){
        this.nombre = nombre
        this.apellido = apellido
        this.username = username
        this.fechaDeAlta = fechaDeAlta
        this.paisDeResidencia = paisDeResidencia
        this.diasParaViajar = diasParaViajar       
        this.destinosDeseados = destinosDeseados
        this.destinosVisitados = destinosVisitados
        this.criterio = criterio
        this.gustos = gustos
        this.amigos = _amigos
        this.contrasenia = contrasenia
    }

    static fromJson(usuarioJson:UsuarioJson):Usuario{

        let usuario = Object.assign(new Usuario("","","",new Date(),"",0,[],[],new Relajado(),new Neofilo(),[]),usuarioJson,{gustos: usuarioJson.gustos ? Gusto.fromJson(usuarioJson.gustos) : undefined  })
        usuario.fechaDeAlta = new Date(usuario.fechaDeAlta)         //Convierte la fecha de alta de string a una Date
        return usuario
    }

    toJson(){
        return JSON.stringify(this)
    }

/*
    toJSON(): UsuarioJson {
        return {

            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            username: this.username,
            paisDeResidencia: this.paisDeResidencia,
            destinosDeseados: this.destinosDeseados,
            destinosVisitados: this.destinosVisitados,
            gustos: this.gustos,
            criterio: this.criterio,
            diasParaViajar: this.diasParaViajar,
            fechaDeAlta: this.fechaDeAlta,
            itinerarios: this.itinerarios,
        }
    }
*/
    getGustosType():string[]{

        return this.gustos.getTipo()
    }

    calcularAntiguedad():number{
        const fecha:Date = new Date(Date.now())
        return fecha.getFullYear()-this.fechaDeAlta.getFullYear()
    }

    calcularCostoDeViaje(destino: Destino): number{
        let costoBase = destino.calcularCostoBase()

        if(this.paisDeResidencia.toUpperCase() === destino.pais.toUpperCase()){
            costoBase -= (destino.costo * (Math.min(15, this.calcularAntiguedad()))/100)
        }
        return costoBase
    }

    conoceDestino(destino: Destino):boolean {
        let aux1 = this.destinosDeseados.map( it => it.id )
        let aux2 = this.destinosVisitados.map( it => it.id )
        return (aux1.includes(destino.id) || aux2.includes(destino.id))
    }

    deseaDestino(destino: Destino): boolean{
        return (this.destinosDeseados.includes(destino))
    }

    tieneAmigos(): boolean{
        return this.amigos.length != 0
    }

    amigosConocenDestino(destino: Destino): boolean{
        return this.amigos.some(amigo => amigo.conoceDestino(destino))
    }

    puedeRealizarItinerario(itinerario: Itinerario): boolean{
        return (this.diasParaViajar >= itinerario.cantidadDeDias()) && (this.criterio.aceptaItinerario(this, itinerario)) 
    }
    
    crearPuntuacion(nota: number): Puntuacion{
        const puntuacion = new Puntuacion(nota, this);
        return puntuacion 
    }
    
    puedePuntuarItinerario(itinerario: Itinerario){
        return this.conoceDestino(itinerario.destino) && itinerario.creador.id != this.id && !(itinerario.puntuaciones.map(it => it.creador.id).includes(this.id))
    }

    puntuarItinerario(itinerario: Itinerario, nota: number){
        const error = new Error('No se pueden puntuar itinerarios de los cuales se es creador, ya se puntuaron o del cual no se conoce su destino')
        if (!this.puedePuntuarItinerario(itinerario)) {
            throw error
        } else {
            itinerario.agregarPuntuacion(this.crearPuntuacion(nota)) 
        }
    }

    cambiarCriterio(criterio: Criterio){
        this.criterio = criterio
    }

    leGustaVehiculo(vehiculo: Vehiculo):boolean {
        return this.gustos.condicion(vehiculo)
    }

    //############################################################# Funciones De Agregar/Quitar Valores a listas #############################################################

    agregarItinerario(itinerario: Itinerario){
        this.itinerarios.push(itinerario)
    }

    agregarDestinoDeseado(destino: Destino){
        this.destinosDeseados.push(destino)
    }

    agregarDestinoVisitado(destino: Destino){
        this.destinosVisitados.push(destino)
    }

    agregarAmigo(usuario: Usuario){
        this.amigos.push(usuario)
    }

    //############################################################# Funciones De edicion de Itinerario #############################################################
    
    agregarActividadAlItinerario(itinerario: Itinerario, dia:number, actividad:Actividad){
        if(itinerario.puedeModificarItinerario(this)){
            itinerario.agregarActividadAItinerario(dia, actividad)
        }
    }

    quitarActividadDelItinerario(itinerario: Itinerario, dia:number, actividad:Actividad){
        if (itinerario.puedeModificarItinerario(this)){
            
            const index = itinerario.diasDeActividad[dia].actividades.indexOf(actividad, 0);

            if (index > -1) {
            itinerario.diasDeActividad[dia].actividades.splice(index, 1);
            }
        }
    }

    agregarDiaAlItinerario(itinerario: Itinerario, diaDeActividad: DiaDeActividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            itinerario.diasDeActividad.push(diaDeActividad)
        }
    }
    
    quitarDiaAlItinerario(itinerario: Itinerario, diaDeActividad: DiaDeActividad) {
        if (itinerario.puedeModificarItinerario(this)) {
            const index =  itinerario.diasDeActividad.indexOf(diaDeActividad, 0);

            if (index > -1) {
            itinerario.diasDeActividad.splice(index, 1);
            }
        }
    }
    
}