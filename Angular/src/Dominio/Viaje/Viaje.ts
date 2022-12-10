import { Itinerario } from "../Itinerarios/Itinerarios";
import { Usuario } from "../Usuario/Usuario";
import { Vehiculo } from "../vehiculo/vehiculo";

class Viaje{

    readonly itinerarios:Array<Itinerario>
    readonly vehiculo:Vehiculo
    readonly usuario:Usuario
    readonly diasDelAlquiler:number

    constructor(_itinerarios:Array<Itinerario>, _vehiculo:Vehiculo, _usuario:Usuario, _diasDelAlquiler:number){

        this.itinerarios = _itinerarios
        this.vehiculo = _vehiculo
        this.usuario = _usuario
        this.diasDelAlquiler = _diasDelAlquiler

    }

}