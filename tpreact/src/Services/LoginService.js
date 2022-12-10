import axios from 'axios'
import {REST_SERVER_URL} from "./Utils"

export class LoginService {

    async login(user) {
        const response = await axios.post(REST_SERVER_URL + '/login', user)
        if(response == null){
          throw new Error("El usuario o contraseña ingresadas son incorrectas")
        }else{
          //retorna el id del usuario logueado
          return response.data.id
        }
      }

}

export const loginService = new LoginService()