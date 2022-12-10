import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-Input_Selector',
  templateUrl: './Input_Selector.component.html',
  styleUrls: ['./Input_Selector.component.css']
})
export class Input_SelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() label!:string
  @Input() optionList!:Array<any>
  @Input() text!:any
  @Output() textChange = new EventEmitter<any>();
}
