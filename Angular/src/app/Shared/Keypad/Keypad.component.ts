import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Keypad',
  templateUrl: './Keypad.component.html',
  styleUrls: ['./Keypad.component.css']
})
export class KeypadComponent implements OnInit {

  constructor() { }

  @Input() accept!:Function
  @Input() cancel!:Function

  ngOnInit() {
  }



}
