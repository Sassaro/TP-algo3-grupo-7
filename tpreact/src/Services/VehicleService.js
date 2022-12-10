import axios from 'axios'
import { Vehiculo } from '../Domain/vehiculo'
import {REST_SERVER_URL} from "./Utils"

export class VehicleService {

    async createVehicle(vehicleJson){
        await axios.post(REST_SERVER_URL + '/createVehicle', vehicleJson)
    }

    async getVehicles(){
        const vehiclesJson = await axios.get( REST_SERVER_URL + "/vehicles" )
        const vehicles = vehiclesJson.data.map( (vehicleJson) => {return Vehiculo.fromJson(vehicleJson)} )
        return vehicles
    }

    async getVehiclesById(id){
        const vehicleJson = await axios.get( REST_SERVER_URL + "/vehicles/" + id )
        const vehicle = Vehiculo.fromJson(vehicleJson.data)
        return vehicle
    }

    async deleteVehicle(id){
        await axios.delete(REST_SERVER_URL + "/deleteVehicle/" + id)
    }

    async updateVehicle(vehicleJson){
        await axios.patch(REST_SERVER_URL + '/updateVehicle', vehicleJson)
    }

    async filterVehicles(value){
        const vehiclesJson = await axios.get(REST_SERVER_URL + '/searchVehicles/' + value)
        const vehicle = vehiclesJson.data.map( (vehicleJson) => {return Vehiculo.fromJson(vehicleJson)} )
        return vehicle
    }

}

export const vehicleService = new VehicleService()