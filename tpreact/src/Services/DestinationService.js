import axios from 'axios'
import { Destino } from '../Domain/Destino'
import {REST_SERVER_URL} from "./Utils"

export class DestinationService {

    async createDestination(destinationJson){
        await axios.post(REST_SERVER_URL + '/createDestination', destinationJson)
    }

    async getDestination(){
        const destinationJson = await axios.get(REST_SERVER_URL + '/prueba')
        const destinations = destinationJson.data.map( (destinationJson) => {return Destino.fromJson(destinationJson)} )
        return destinations
    }

    async deleteDestination(id){
        await axios.delete(REST_SERVER_URL + '/deleteDestination/' + id)
    }

    async filterDestinations(value){
        const destinationJson = await axios.get(REST_SERVER_URL + '/searchDestination/' + value)
        const destinations = destinationJson.data.map( (destinationJson) => {return Destino.fromJson(destinationJson)} )
        return destinations
    }
}

export const destinationService = new DestinationService()