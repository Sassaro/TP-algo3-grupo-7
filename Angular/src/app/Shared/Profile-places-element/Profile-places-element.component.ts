import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Profile-places-element',
  templateUrl: './Profile-places-element.component.html',
  styleUrls: ['./Profile-places-element.component.css']
})
export class ProfilePlacesElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() text!:string

}
