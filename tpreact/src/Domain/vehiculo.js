import {DESCUENTO_CONVENIO,LIMITE_CILINDRADAS,MUCHOS_DIAS_ALQUILER} from "./Constantes"

export class VehiculoJSON  {
    id
    type = ""
    marca = ""
    modelo = ""
    anioDeFabricacion
    costoDiario
    tieneConvenio = false
    kilometrajeLibre = false
    cilindradas
    hatchback = false
    cuatroXCuatro = false

}

export class Vehiculo {
    id
    type = ""
    marca
    modelo
    anioDeFabricacion
    costoDiario
    tieneConvenio
    kilometrajeLibre

    constructor(_marca, _modelo, _anio,_costo, _tieneConvenio, _kilometrajeLibre){
        this.marca = _marca
        this.modelo = _modelo
        this.anioDeFabricacion = _anio
        this.costoDiario= _costo
        this.tieneConvenio = _tieneConvenio
        this.kilometrajeLibre = _kilometrajeLibre
    }

    static fromJson(VehiculoJSON){

        if(VehiculoJSON.type == "Moto"){
            return Object.assign(new Moto(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }
        if(VehiculoJSON.type == "Auto"){
            return Object.assign(new Auto(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }if(VehiculoJSON.type == "Camioneta"){
            return Object.assign(new Camioneta(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }
        throw new Error("Tipo incorrecto")
    }

    antiguedad(){
        return (new Date().getFullYear()  - this.anioDeFabricacion.getFullYear())
    }

    costoBase(diasDeAlquiler) {
        return this.costoDiario * diasDeAlquiler
    }

    costoDeAlquiler(diasDeAlquiler) {
        return this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler) - this.tieneDescuento(diasDeAlquiler)
    }

    tieneDescuento(diasDeAlquiler) {

        if (this.tieneConvenio) {
            return (this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler)) * DESCUENTO_CONVENIO
        } else {
            return 0.0
        }
    }
    
    contiene(palabra){
        return (this.marca.toUpperCase().concat(" " + this.modelo.toUpperCase() + " " + this.anioDeFabricacion.toString())).includes(palabra.toUpperCase())
    }
}

export class Moto extends Vehiculo{
    type = "Moto"
    cilindradas
    id = -1

    constructor(_marca = "", _modelo = "", _anio = new Date(),_costo = 0,_cilindradas = 0, _tieneConvenio = false, _kilometrajeLibre = false){
        super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)     
        this.cilindradas=_cilindradas
    }

    costoEspecifico(diasDeAlquiler) {
        if (this.cilindradas > LIMITE_CILINDRADAS) {
            return 500.0 * diasDeAlquiler
        } else return 0.0
    }

    toJson() {
        return{
            type: this.type,
            marca: this.marca,
            modelo: this.modelo,
            anioDeFabricacion: this.anioDeFabricacion.toString(),
            costoDiario: this.costoDiario,
            tieneConvenio: this.tieneConvenio,
            kilometrajeLibre: this.kilometrajeLibre,
            cilindradas: this.cilindradas,
            hatchback: undefined,
            cuatroXCuatro: undefined
        }
    }
}

export class Auto extends Vehiculo{
    type = "Auto"
    hatchback
    id = -1

    constructor(_marca = "", _modelo = "", _anio = new Date(),_costo = 0,_hatchback = false, _tieneConvenio = false, _kilometrajeLibre = false){
        super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)
        this.hatchback= _hatchback
    }

    costoEspecifico(diasDeAlquiler) {
        if (this.hatchback) {
            return this.costoBase(diasDeAlquiler) * 0.1
        } else return this.costoBase(diasDeAlquiler) * 0.25
    }
    toJson() {
        return{
            type: this.type,
            marca: this.marca,
            modelo: this.modelo,
            anioDeFabricacion: this.anioDeFabricacion.toString(),
            costoDiario: this.costoDiario,
            tieneConvenio: this.tieneConvenio,
            kilometrajeLibre: this.kilometrajeLibre,
            cilindradas: undefined,
            hatchback: this.hatchback,
            cuatroXCuatro: undefined
        }
    }
}

export class Camioneta extends Vehiculo{
        type = "Camioneta"
        cuatroXCuatro
        id = -1

        constructor(_marca = "", _modelo = "", _anio = new Date() ,_costo = 0 ,_cuatroXCuatro = false, _tieneConvenio = false, _kilometrajeLibre = false){
            super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)
            this.cuatroXCuatro= _cuatroXCuatro
        }

        costoEspecifico(diasDeAlquiler) {
            if (this.cuatroXCuatro) {
                return this.muchosDias(diasDeAlquiler) * 1.5
            } else return this.muchosDias(diasDeAlquiler)
        }

        muchosDias(diasDeAlquiler) {

            let aux = 10000

            if (!(diasDeAlquiler <= MUCHOS_DIAS_ALQUILER)) {
                aux += 1000 * (diasDeAlquiler - MUCHOS_DIAS_ALQUILER)
            }
            return aux
        }
        toJson() {
            return{
                type: this.type,
                marca: this.marca,
                modelo: this.modelo,
                anioDeFabricacion: this.anioDeFabricacion.toString(),
                costoDiario: this.costoDiario,
                tieneConvenio: this.tieneConvenio,
                kilometrajeLibre: this.kilometrajeLibre,
                cilindradas: undefined,
                hatchback: undefined,
                cuatroXCuatro: this.cuatroXCuatro
            }
        }
}

