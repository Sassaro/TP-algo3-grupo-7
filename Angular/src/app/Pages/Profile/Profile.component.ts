import { Neofilo, Supersticioso } from 'src/Dominio/Gustos/Gustos';
import { Combinado, Caprichoso, Selectivo, SinLimite } from './../../../Dominio/Gustos/Gustos';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/Profile.service';
import { Usuario, UsuarioJson } from 'src/Dominio/Usuario/Usuario';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  showUpdateCard:boolean = false
  user!:Usuario
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(private dataService:ProfileService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.getUser()
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

  async getUser() {

    this.user = await this.dataService.getUser( parseInt(this.getUserId()!!))

  }

  actualizarUsuario() {
    this.dataService.actualizarUser(this.user).subscribe()
    this.showUpdateCard = true
    setTimeout(() => {
      this.showUpdateCard = false
    }, 3000)
  }

  cancelarActualizacion() {
    this.getUser()
  }

  getUserPreferenceAsCombinado(){
    return this.user.gustos as Combinado
  }

  clickNeofiloPreference(){
    let aux = this.getUserPreferenceAsCombinado()
    const gustoAUsar = "Neofilo"

    if(aux.getTipo().includes(gustoAUsar)){
      aux.quitarGusto(aux.getGustoEnLista(gustoAUsar))
    }else{
      aux.agregarGusto(new Neofilo())
    }
  }

  clickSupersticiosoPreference(){
    let aux = this.getUserPreferenceAsCombinado()
    const gustoAUsar = "Supersticioso"

    if(aux.getTipo().includes(gustoAUsar)){
      aux.quitarGusto(aux.getGustoEnLista(gustoAUsar))
    }else{
      aux.agregarGusto(new Supersticioso())
    }
  }

  clickCaprichosoPreference(){
    let aux = this.getUserPreferenceAsCombinado()
    const gustoAUsar = "Caprichoso"

    if(aux.getTipo().includes(gustoAUsar)){
      aux.quitarGusto(aux.getGustoEnLista(gustoAUsar))
    }else{
      aux.agregarGusto(new Caprichoso())
    }
  }

  clickSelectivoPreference(){
    let aux = this.getUserPreferenceAsCombinado()
    const gustoAUsar = "Selectivo"

    if(aux.getTipo().includes(gustoAUsar)){
      aux.quitarGusto(aux.getGustoEnLista(gustoAUsar))
    }else{
      aux.agregarGusto(new Selectivo(""))
    }
  }

  clickSinLimitePreference(){
    let aux = this.getUserPreferenceAsCombinado()
    const gustoAUsar = "SinLimite"

    if(aux.getTipo().includes(gustoAUsar)){
      aux.quitarGusto(aux.getGustoEnLista(gustoAUsar))
    }else{
      aux.agregarGusto(new SinLimite())
    }
  }
}

