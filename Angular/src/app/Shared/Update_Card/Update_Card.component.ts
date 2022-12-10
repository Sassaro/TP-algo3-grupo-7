import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Update_Card',
  templateUrl: './Update_Card.component.html',
  styleUrls: ['./Update_Card.component.css']
})
export class Update_CardComponent implements OnInit {

  @Input() isOn:boolean = false
  @Input() text:string = ""

  constructor() { }

  ngOnInit() {
  }

}
