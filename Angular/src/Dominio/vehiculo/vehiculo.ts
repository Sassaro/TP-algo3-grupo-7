import { VERSION } from "@angular/core"
import { throwError } from "rxjs"
import {DESCUENTO_CONVENIO,LIMITE_CILINDRADAS,MUCHOS_DIAS_ALQUILER} from "../Utils/Constantes"

export type VehiculoJSON = {
    type:string 
    marca: string
    modelo: string
    anioDeFabricacion: string
    costoDiario: number
    tieneConvenio: boolean
    kilometrajeLibre: boolean
    cilindradas?: number
    hatchback?: boolean
    cuatroXCuatro?: boolean
}

export abstract class Vehiculo {
    readonly type:string = ""
    public marca: string
    public modelo: string
    public anioDeFabricacion: Date
    public costoDiario: number
    public tieneConvenio: boolean
    public kilometrajeLibre: boolean

    constructor(_marca:string, _modelo:string, _anio:Date,_costo:number, _tieneConvenio:boolean, _kilometrajeLibre:boolean){
        this.marca = _marca
        this.modelo = _modelo
        this.anioDeFabricacion = _anio
        this.costoDiario= _costo
        this.tieneConvenio = _tieneConvenio
        this.kilometrajeLibre = _kilometrajeLibre
    }

    abstract toJson(): VehiculoJSON

    static fromJson(VehiculoJSON:VehiculoJSON):Vehiculo{

        if(VehiculoJSON.type == "Moto"){
            return Object.assign(new Moto(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }
        if(VehiculoJSON.type == "Auto"){
            return Object.assign(new Auto(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }if(VehiculoJSON.type == "Camioneta"){
            return Object.assign(new Camioneta(),VehiculoJSON,{anioDeFabricacion: new Date(VehiculoJSON.anioDeFabricacion)})
        }
        throw new Error("Tipo incorrecto");
        
    }

    antiguedad(){
        return (new Date().getFullYear()  - this.anioDeFabricacion.getFullYear())
    }

    costoBase(diasDeAlquiler : number): number {
        return this.costoDiario * diasDeAlquiler
    }

    costoDeAlquiler(diasDeAlquiler: number):number {
        return this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler) - this.tieneDescuento(diasDeAlquiler)
    }

    abstract costoEspecifico(diasDeAlquiler: number):number

    tieneDescuento(diasDeAlquiler: number): number {

        if (this.tieneConvenio) {
            return (this.costoBase(diasDeAlquiler) + this.costoEspecifico(diasDeAlquiler)) * DESCUENTO_CONVENIO
        } else {
            return 0.0
        }
    }
    
    contiene(palabra: string): boolean{
        return (this.marca.toUpperCase().concat(" " + this.modelo.toUpperCase() + " " + this.anioDeFabricacion.toString())).includes(palabra.toUpperCase())
    }
}

export class Moto extends Vehiculo{
    override readonly type = "Moto"
    cilindradas: number
    id: number = -1

    constructor(_marca:string = "", _modelo:string = "", _anio:Date = new Date(),_costo:number = 0,_cilindradas:number = 0, _tieneConvenio:boolean = false, _kilometrajeLibre:boolean = false){
        super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)     
        this.cilindradas=_cilindradas
    }

    override costoEspecifico(diasDeAlquiler: number): number {
        if (this.cilindradas > LIMITE_CILINDRADAS) {
            return 500.0 * diasDeAlquiler
        } else return 0.0
    }

    override toJson(): VehiculoJSON {
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
    override readonly type = "Auto"
    private hatchback: boolean
    private id: number = -1

    constructor(_marca:string = "", _modelo:string = "", _anio:Date = new Date(),_costo:number = 0,_hatchback:boolean = false, _tieneConvenio:boolean = false, _kilometrajeLibre:boolean = false){
        super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)
        this.hatchback= _hatchback
    }

    override costoEspecifico(diasDeAlquiler: number): number {
        if (this.hatchback) {
            return this.costoBase(diasDeAlquiler) * 0.1
        } else return this.costoBase(diasDeAlquiler) * 0.25
    }
    override toJson(): VehiculoJSON {
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
    override readonly type = "Camioneta"
        private cuatroXCuatro: boolean
        private id: number = -1

        constructor(_marca:string = "", _modelo:string = "", _anio:Date = new Date() ,_costo:number = 0 ,_cuatroXCuatro:boolean = false, _tieneConvenio:boolean = false, _kilometrajeLibre:boolean = false){
            super(_marca,_modelo,_anio,_costo,_tieneConvenio,_kilometrajeLibre)
            this.cuatroXCuatro= _cuatroXCuatro
        }

        override costoEspecifico(diasDeAlquiler: number): number {
            if (this.cuatroXCuatro) {
                return this.muchosDias(diasDeAlquiler) * 1.5
            } else return this.muchosDias(diasDeAlquiler)
        }

        muchosDias(diasDeAlquiler: number): number {

            let aux = 10000

            if (!(diasDeAlquiler <= MUCHOS_DIAS_ALQUILER)) {
                aux += 1000 * (diasDeAlquiler - MUCHOS_DIAS_ALQUILER)
            }
            return aux
        }
        override toJson(): VehiculoJSON {
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

