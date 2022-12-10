import { Login } from './../../../Dominio/Usuario/Login';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Validation_Field',
  templateUrl: './Validation_Field.component.html',
  styleUrls: ['./Validation_Field.component.css']
})
export class Validation_FieldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() object!:Login
  @Input() field!:string

}
