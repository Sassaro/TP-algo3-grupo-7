/* eslint-disable no-unused-vars */

import axios from 'axios'
import { Actividad } from '../Domain/Actividades'
import {REST_SERVER_URL} from "./Utils"

export class ActivityService {

    async createActivity(activityJson){
        await axios.post(REST_SERVER_URL + '/createActivity', activityJson)
    }

    async getActivities(){
        const activitiesJson = await axios.get(REST_SERVER_URL + '/activities')
        const activities = activitiesJson.data.map((activityJson) => Actividad.fromJson(activityJson))
        return activities
    }

    async getActivitiesById(id){
        const activityJson = await axios.get(REST_SERVER_URL + '/activities/' + id)
        const activity =  Actividad.fromJson(activityJson.data)
        return activity
    }


    async deleteActivity(id){
        await axios.delete(REST_SERVER_URL + "/deleteActivity/" + id)
    }

    async updateActivity(activityJson){
        await axios.patch(REST_SERVER_URL + '/updateActivity', activityJson)
    }

    async filterActivities(value){
        const activitiesJson = await axios.get(REST_SERVER_URL + '/searchActivities/' + value)
        const activities = activitiesJson.data.map( (activityJson) => {return Actividad.fromJson(activityJson)} )
        return activities
    }

}

export const activityService = new ActivityService()