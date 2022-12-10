import { Dificultad } from './../../../Dominio/Actividades/Actividades';
import { Relajado, Precavido, Localista, Soniador, Activo, Exigente } from './../../../Dominio/Criterio/Criterio';
import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { Component, Input, OnInit } from '@angular/core';
import { Criterio } from 'src/Dominio/Criterio/Criterio';

@Component({
  selector: 'app-User-Data',
  templateUrl: './User-Data.component.html',
  styleUrls: ['./User-Data.component.css']
})
export class UserDataComponent implements OnInit {


  readonly countries:Array<string> =  ["Argentina","Peru","Brazil","Chile","Uruguay","Paraguay"]
  readonly criteria:Array<Criterio> =  [new Relajado(), new Precavido(), new Localista(), new Soniador(), new Activo(), new Exigente(Dificultad.BAJA,10)]

  constructor() { }

  ngOnInit() {


  }

  @Input() user!:Usuario


}
