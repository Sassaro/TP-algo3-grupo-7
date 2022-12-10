import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-Result-Bar',
  templateUrl: './Result-Bar.component.html',
  styleUrls: ['./Result-Bar.component.css']
})
export class ResultBarComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  @Input() cantidad!: number

}
