import { Component, OnInit } from '@angular/core';
import { FuncionesDeTiempo } from "../../../Dominio/Utils/Funciones/ManejoTiempo"
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  year =  FuncionesDeTiempo.getCurrentYear()

  faSquareFacebook = faSquareFacebook

}
