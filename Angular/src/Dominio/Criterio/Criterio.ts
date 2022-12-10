import { Dificultad } from 'src/Dominio/Actividades/Actividades';
import { Itinerario } from "../Itinerarios/Itinerarios";
import { Usuario } from "../Usuario/Usuario";

export type CriterioJson = {

    type: string,
    dificultad:Dificultad,
    porcentaje:number,

}

export class Criterio{

    type:string = ""
    aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean{
        return false
    }

    static fromJson(criterioJson:CriterioJson):Criterio{

        switch(criterioJson.type){

            case "Relajado" : {
                return new Relajado()
            }
            case "Precavido" : {
                return new Precavido()
            }
            case "Localista" : {
                return new Localista()
            }
            case "Soniador" : {
                return new Soniador()
            }
            case "Activo" : {
                return new Activo()
            }
            case "Exigente" : {
                return new Exigente(criterioJson.dificultad,criterioJson.porcentaje)
            }
        }
        throw new Error("Tipo Invalido")
    }
/*
    toJSON(criterio:Criterio):CriterioJson{
        return {
            type: this.type,
            dificultad: this.dificultad,
            porcentaje: this.porcentaje,
        }
    }
    */
}

export class Relajado extends Criterio{
    override type = "Relajado"

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {
        return true
    }

}

export class Precavido extends Criterio{
    override type = "Precavido"

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {
        return usuario.amigos.flatMap((amigo)=>{return amigo.destinosVisitados}).includes(itinerario.destino)  || usuario.conoceDestino(itinerario.destino)
    }

}

export class Localista extends Criterio{
    override type = "Localista"

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {
        return itinerario.destino.esLocal()
    }

}

export class Soniador extends Criterio {
    override type = "Soniador"

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {

        const costosDeLosDestinosDelUsuario = usuario.destinosDeseados.map((destino)=>{return destino.calcularCostoBase()})
        const destinoDeseadoMasCaro = Math.max(...costosDeLosDestinosDelUsuario)

        return destinoDeseadoMasCaro < itinerario.destino.calcularCostoBase() || usuario.destinosDeseados.includes(itinerario.destino)

    }

}

export class Activo extends Criterio {
    override type = "Activo"

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {
        return itinerario.diasDeActividad.every((dia)=>{return !dia.estaVacio()})
    }

}

export class Exigente extends Criterio {
    override type = "Exigente"

    dificultad:Dificultad
    porcentaje:number

    constructor(_dificultad:Dificultad, _porcentaje:number){
        super()
        this.dificultad = _dificultad
        this.porcentaje = _porcentaje
    }

    override aceptaItinerario(usuario: Usuario, itinerario: Itinerario): boolean {
        return itinerario.porcentajeDificultadDeActividad(this.dificultad) >= this.porcentaje
    }

}