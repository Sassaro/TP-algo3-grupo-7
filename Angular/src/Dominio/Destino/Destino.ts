import {PAIS_LOCAL, BONUS_POR_NO_SER_DESTINO_LOCAL} from "../Utils/Constantes"

export type DestinoJson = {

    id:number
    pais:string,
    ciudad:string,
    costo:number
}


export class Destino{
    
    id:number = -1
    pais:string
    ciudad:string
    costo:number

    constructor(_pais:string = "", _ciudad:string = "", _costo:number = 0){
        this.pais = _pais
        this.ciudad = _ciudad
        this.costo = _costo
    }

    static fromJson(destinoJson:DestinoJson):Destino{
        return Object.assign(new Destino(),destinoJson)
    }

    esLocal():boolean{
        return this.pais.toUpperCase() == PAIS_LOCAL
    }

    calcularCostoBase():number{

        let costoAux = this.costo

        if (!this.esLocal()) {
            return costoAux += (costoAux * BONUS_POR_NO_SER_DESTINO_LOCAL)
        }
        return costoAux
    }

    validacion(): boolean {     //Si el pais o la ciudad estan vacios o son null, esto devuelve false
        return !(!this.pais || !this.ciudad || this.costo <= 0)
    }

}