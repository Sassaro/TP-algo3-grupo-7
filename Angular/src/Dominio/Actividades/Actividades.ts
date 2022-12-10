import { FuncionesDeTiempo } from "../Utils/Funciones/ManejoTiempo"

export enum Dificultad{
    BAJA = "BAJA",
    MEDIA = "MEDIA",
    ALTA = "ALTA"
}

export type ActividadJson = {

    costo:number
    descripcion:string
    dificultad:Dificultad
    inicio:string
    fin:string

}

export class Actividad{

    readonly costo:number
    readonly descripcion:string
    readonly dificultad:Dificultad
    readonly inicio:Date
    readonly fin:Date

    constructor(_costo:number = 0, _descripcion:string = "", _dificultad:Dificultad = Dificultad.BAJA, _inicio:Date = new Date(),_fin:Date = new Date()){
        this.costo = _costo;
        this.descripcion = _descripcion
        this.dificultad = _dificultad
        this.inicio = _inicio
        this.fin = _fin
    }

    static fromJson(actividadJson:ActividadJson){
        //Se le setea un dia porque es Date, no existe localTime en Ts.
        let inicio = new Date( "December 20, 2020 " + actividadJson.inicio)
        let fin = new Date( "December 20, 2020 " +  actividadJson.fin)

        return Object.assign(new Actividad(),actividadJson,{inicio: FuncionesDeTiempo.getHora(inicio), fin: FuncionesDeTiempo.getHora(fin) })
    }

    toJson():ActividadJson{

        return {
            costo: this.costo,
            descripcion: this.descripcion,
            dificultad: this.dificultad,
            inicio: this.convertTimeFormat(this.inicio),
            fin: this.convertTimeFormat(this.fin)
        }
    }

    convertTimeFormat(time:Date):string{

        let aux:string

        if (time.getHours() > 9){
            if(time.getMinutes() > 9){
                aux = time.getHours().toString() + ":" + time.getMinutes().toString() + ":00"
            }else{
                aux = time.getHours().toString() + ":0" + time.getMinutes().toString() + ":00"
            }
        }else{
            if(this.inicio.getMinutes() > 9){
                aux = "0" + time.getHours().toString() + ":" + time.getMinutes().toString() + ":00"
            }else{
                aux = "0" + time.getHours().toString() + ":0" + time.getMinutes().toString() + ":00"
            }
        }

        return aux
    }

    duracionActividad():number{
        return FuncionesDeTiempo.tiempoEntre(this.inicio,this.fin)
    }

    iniciaDespuesDeFinalizar():boolean{
        return FuncionesDeTiempo.esDespues(this.inicio,this.fin)
    }

    contiene(palabra: string): boolean {
        return (this.descripcion.toUpperCase() || '').includes(palabra.toUpperCase())
    }

}
