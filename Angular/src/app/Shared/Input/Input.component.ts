import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-Input',
  templateUrl: './Input.component.html',
  styleUrls: ['./Input.component.css']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() label: string = "Test"
  @Input() type: string = "text"
  @Input() text!:any
  @Output() textChange = new EventEmitter<any>();

}
