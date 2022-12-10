import {PAIS_LOCAL, BONUS_POR_NO_SER_DESTINO_LOCAL} from "./Constantes"

export class DestinoJson {

    id
    pais = ""
    ciudad = ""
    costo
}

export class Destino{
    
    id
    pais 
    ciudad 
    costo

    constructor(_pais = "", _ciudad = "", _costo = 0){
        this.pais = _pais
        this.ciudad = _ciudad
        this.costo = _costo
    }

    static fromJson(destinoJson){
        return Object.assign(new Destino(),destinoJson)
    }

    esLocal(){
        return this.pais.toUpperCase() == PAIS_LOCAL
    }

    calcularCostoBase(){

        let costoAux = this.costo

        if (!this.esLocal()) {
            return costoAux + (costoAux * BONUS_POR_NO_SER_DESTINO_LOCAL)
        }
        return costoAux
    }

    validacion() {     //Si el pais o la ciudad estan vacios o son null, esto devuelve false
        return !(!this.pais || !this.ciudad || this.costo <= 0)
    }

}