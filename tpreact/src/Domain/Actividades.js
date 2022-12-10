import { FuncionesDeTiempo } from "./Utils"

export const Dificultad = Object.freeze({
    BAJA: "BAJA",
    MEDIA: "MEDIA",
    ALTA: "ALTA",
})

export class ActividadJson {

    id
    costo
    descripcion
    dificultad
    inicio
    fin

}

export class Actividad{

    id
    costo
    descripcion
    dificultad
    inicio
    fin

    constructor(_costo, _descripcion = "", _dificultad = "", _inicio = "",_fin = ""){
        this.costo = _costo
        this.descripcion = _descripcion
        this.dificultad = _dificultad
        this.inicio = _inicio
        this.fin = _fin
    }

    static fromJson(actividadJson){
        //Se le setea un dia porque es Date, no existe localTime en Ts.
        let inicio = new Date( "December 20, 2020 " + actividadJson.inicio)
        let fin = new Date( "December 20, 2020 " +  actividadJson.fin)

        return Object.assign(new Actividad(),actividadJson,{inicio: FuncionesDeTiempo.getHora(inicio), fin: FuncionesDeTiempo.getHora(fin) })
    }

    toJson(){

        return {
            costo: this.costo,
            descripcion: this.descripcion,
            dificultad: this.dificultad,
            inicio: this.convertTimeFormat(this.inicio),
            fin: this.convertTimeFormat(this.fin)
        }
    }

    convertTimeFormat(time){

        let aux

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

    duracionActividad(){
        return FuncionesDeTiempo.tiempoEntre(this.inicio,this.fin)
    }

    iniciaDespuesDeFinalizar(){
        return FuncionesDeTiempo.esDespues(this.inicio,this.fin)
    }

    contiene(palabra) {
        return (this.descripcion.toUpperCase() || '').includes(palabra.toUpperCase())
    }

}
