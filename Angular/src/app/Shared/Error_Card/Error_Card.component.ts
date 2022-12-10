import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Error_Card',
  templateUrl: './Error_Card.component.html',
  styleUrls: ['./Error_Card.component.css']
})
export class Error_CardComponent implements OnInit {

  @Input() errorList:string[] = []

  constructor() { }

  ngOnInit() {
  }

}
