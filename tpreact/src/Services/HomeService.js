/* eslint-disable no-unused-vars */
import axios from 'axios'
import {REST_SERVER_URL} from "./Utils"

export class HomeService {

    async getUserInformation(id){

        const userInformation = await axios.get( REST_SERVER_URL + "/getUserInformation/" + id )
        return userInformation.data

    }
}

export const homeService = new HomeService()