import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-User-Preference',
  templateUrl: './User-Preference.component.html',
  styleUrls: ['./User-Preference.component.css']
})
export class UserPreferenceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() text!:string
  @Input() isOn:boolean = false

  toggle(){
    this.isOn = !this.isOn
  }

  status():string{
    if(this.isOn){
      return "botonPreferenciaOn"
    }else{
      return ""
    }
  }

}
