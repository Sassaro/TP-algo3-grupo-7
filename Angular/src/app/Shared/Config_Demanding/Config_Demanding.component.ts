import { Exigente } from './../../../Dominio/Criterio/Criterio';
import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Config_Demanding',
  templateUrl: './Config_Demanding.component.html',
  styleUrls: ['./Config_Demanding.component.css']
})
export class Config_DemandingComponent implements OnInit {

  @Input() isOn = false
  @Input() user!:Usuario
  userCriteria!:Exigente 
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {

    if(this.userCriteria == null && this.isOn){
      this.getUserCriteriaAsExigente()
    }
  }

  getUserCriteriaAsExigente(){
    this.userCriteria = this.user.criterio as Exigente
  }

}
