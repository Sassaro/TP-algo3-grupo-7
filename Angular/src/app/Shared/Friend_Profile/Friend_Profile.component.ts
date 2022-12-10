import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Friend_Profile',
  templateUrl: './Friend_Profile.component.html',
  styleUrls: ['./Friend_Profile.component.css']
})
export class Friend_ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() user!:Usuario

}
