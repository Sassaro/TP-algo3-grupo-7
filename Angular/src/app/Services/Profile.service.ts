import { Router } from '@angular/router';
import { Injectable } from '@angular/core'
import { Relajado } from 'src/Dominio/Criterio/Criterio'
import { Destino } from 'src/Dominio/Destino/Destino'
import { Supersticioso } from 'src/Dominio/Gustos/Gustos'
import { Usuario, UsuarioJson } from 'src/Dominio/Usuario/Usuario'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { REST_SERVER_URL } from './Configuration'
import { lastValueFrom } from 'rxjs'

export interface IProfileService {

  getUser(): Usuario

}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private httpClient: HttpClient, private router:Router) {}
  
  async getUser(id:number) {
    
    const usuarioJSON$ = this.httpClient.get<UsuarioJson>(REST_SERVER_URL + '/pruebaUser/' + id)
    const usuarioJSON = await lastValueFrom(usuarioJSON$)
    console.log("se ejecuta")
    if (usuarioJSON === undefined) {
        throw new Error("No se encontro el usuario")
    }else{
      return Usuario.fromJson(usuarioJSON)
    }
    
  }

  async getUsers() {
    
    const usuarios$ = this.httpClient.get<UsuarioJson[]>(REST_SERVER_URL + '/pruebaUser')
    const usuarios = await lastValueFrom(usuarios$)
    console.log("se ejecuta")
    return usuarios.map((usuarioJSON) => Usuario.fromJson(usuarioJSON))
  }

  actualizarUser(user: Usuario) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.patch<string>(REST_SERVER_URL + '/pruebaEditarUser/' + user.id, user.toJson(),{headers: headers})
  }

  async login(user: Usuario) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    let response = await lastValueFrom(this.httpClient.post(REST_SERVER_URL + '/login', user.toJson(),{headers: headers}))

    if(response == null){
      throw new Error("El usuario o contraseña ingresadas son incorrectas")
    }else{
      Object.assign(user,response)
      this.router.navigate([user.id +'/main'])
    }
  }
}

@Injectable({
  providedIn: 'root'
})


export class StubProfileService implements IProfileService {
  constructor() {}

  getUser(): Usuario {
    return usuario
  }
}


const destinoLocal = new Destino('Argentina', 'Bariloche', 1850)
const destinoNoLocal = new Destino('Brazil', 'Petropolis', 1000)
const destinoNoLocal2 = new Destino('Uruguay', 'Montevideo', 2500)
const destinoNoLocal3 = new Destino('Italia', 'Roma', 3000)
const destinoNoLocal4 = new Destino('Nicaragua', 'Managua', 1850)

const inicio2 = new Date('2001-10-09')
const supersticioso = new Supersticioso()

const usuario1 = new Usuario(
  'Giovanni',
  'Rossi',
  'GioRoss',
  inicio2,
  'Argentina',
  10,
  [destinoLocal],
  [],
  new Relajado(),
  supersticioso,
  []
)
const usuario2 = new Usuario(
  'Jose',
  'Fernandez',
  'JoFer',
  inicio2,
  'Argentina',
  10,
  [destinoLocal],
  [],
  new Relajado(),
  supersticioso,
  []
)

const usuario3 = new Usuario(
  'Tomas',
  'Sassaro',
  'tomSass',
  inicio2,
  'Argentina',
  10,
  [destinoLocal],
  [],
  new Relajado(),
  supersticioso,
  []
)

const usuario4 = new Usuario(
  'Armando',
  'Barreras',
  'ArBarr',
  inicio2,
  'Argentina',
  10,
  [destinoLocal],
  [],
  new Relajado(),
  supersticioso,
  []
)

const usuario = new Usuario(
  'Pepe',
  'Barreras',
  'pepBarrera',
  inicio2,
  'Argentina',
  10,
  [destinoLocal, destinoNoLocal, destinoNoLocal4],
  [destinoNoLocal3,destinoNoLocal2],
  new Relajado(),
  supersticioso,
  [usuario2, usuario3, usuario4, usuario1]
)