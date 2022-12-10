import { Usuario } from "../Usuario/Usuario"

export class Puntuacion{
 
    readonly numero:number
    readonly creador:Usuario

    constructor(_valor:number,_creador:Usuario){
        this.numero = _valor
        this.creador = _creador
    }

    validacion():boolean{
        return !(this.numero < 1 || this.numero > 10)
    }
}