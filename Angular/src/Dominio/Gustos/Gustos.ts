import { Vehiculo } from "../vehiculo/vehiculo"

export type GustoJson = {

    type:string;
    marcaF: string;
    listaDeGustos: Gusto[]

}

export class Gusto{

    readonly type:string = ""

    condicion(auto: Vehiculo): boolean{
        return false
    }

    getTipo(): string[] {
        return [this.type]
    }

    static fromJson(gustoJson:GustoJson):Gusto{
    //Se convierten todos en combinados asi es mas facil manejarlos en el front

        switch(gustoJson.type){

            case "Neofilo" : {
                return new Combinado([new Neofilo()])
            }
            case "Supersticioso" : {
                return new Combinado([new Supersticioso()])
            }
            case "Caprichoso" : {
                return new Combinado([new Caprichoso()])
            }
            case "Selectivo" : {
                return new Combinado([new Selectivo(gustoJson.marcaF)])
            }
            case "SinLimite" : {
                return new Combinado([new SinLimite()])
            }
            case "Combinado" : {
                return new Combinado(gustoJson.listaDeGustos)
            }
        }
        throw new Error("Tipo Invalido")
    }
 }

export class Neofilo extends Gusto {

    override type: string = "Neofilo";

    override condicion(auto: Vehiculo): boolean {
        return auto.antiguedad() < 2
    }
}

export class Supersticioso extends Gusto {

    override type: string = "Supersticioso";

    override condicion(auto: Vehiculo): boolean {
        return auto.anioDeFabricacion.getFullYear() % 2 == 0

    }
}
export class Caprichoso extends Gusto {

    override type: string = "Caprichoso";

    override condicion(auto: Vehiculo): boolean {
        return auto.modelo.charAt(0).toUpperCase() ==  auto.marca.charAt(0).toUpperCase()
    }

}
export class Selectivo extends Gusto {

    marcaF:string

    override type: string = "Selectivo"

    constructor(_marcaF:string){
        super()
        this.marcaF = _marcaF
    }
    
    override condicion(auto: Vehiculo): boolean {
        return auto.marca == this.marcaF
    }


}
export class SinLimite extends Gusto {

    override type: string = "SinLimite"

    override condicion(auto: Vehiculo): boolean {
         return auto.kilometrajeLibre
    }

}
export class Combinado extends Gusto {

    listaDeGustos:Array<Gusto>
    override type: string = "Combinado"

    constructor(_listaDeGustos:Array<Gusto>){
        super()
        this.listaDeGustos = _listaDeGustos
    }
    
    override getTipo():string[]{
        return this.listaDeGustos.map( gusto => gusto.type)
    }

    agregarGusto(gusto: Gusto){
        this.listaDeGustos.push(gusto)
    }

    quitarGusto(gusto: Gusto){
        const index = this.listaDeGustos.indexOf(gusto, 0);
        if (index > -1) {
            this.listaDeGustos.splice(index, 1);
        }
    }

    getGustoEnLista(tipo:string):Gusto{
        let gusto = this.listaDeGustos.find( it => it.type == tipo)
        if(gusto == null){
            throw("El tipo de gusto no se encuentra en la lista de gustos")
        }
        return gusto
    }

    override condicion(auto: Vehiculo): boolean {
        return this.listaDeGustos.every((gusto) =>{ return gusto.condicion(auto)})
    }

}