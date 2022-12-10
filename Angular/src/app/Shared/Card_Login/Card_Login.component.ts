import { Router } from '@angular/router';
import { Login } from './../../../Dominio/Usuario/Login';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faKey } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from 'src/app/Services/Profile.service';
import { Relajado } from 'src/Dominio/Criterio/Criterio';
import { Neofilo } from 'src/Dominio/Gustos/Gustos';
import { Usuario } from 'src/Dominio/Usuario/Usuario';
import { mostrarError } from 'src/Utils/GlobalErrorHandler';

@Component({
  selector: 'app-Card_Login',
  templateUrl: './Card_Login.component.html',
  styleUrls: ['./Card_Login.component.css']
})
export class Card_LoginComponent implements OnInit {

  user = new Usuario("","","",new Date(),"",0,[],[],new Relajado(),new Neofilo(),[])    //Crea un nuevo usuario vacio
  login:Login = new Login()
  faKey = faKey
  faMagnifyingGlass = faMagnifyingGlass
  errors = []

  constructor(private router:Router,private dataService:ProfileService) { }

  ngOnInit() {
  }

  tryToLogin(){
    if(this.login.tryLogin()){
      this.user.username = this.login.userName
      this.user.contrasenia = this.login.password
      this.userLogin()
    }
  }

  async userLogin(){
    try {
      await this.dataService.login(this.user)
    } catch (error) {
      mostrarError(this, error)
    }
  }
}
