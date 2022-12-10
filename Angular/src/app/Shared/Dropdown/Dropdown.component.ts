import { ActivatedRoute } from '@angular/router';
import { Destino } from './../../../Dominio/Destino/Destino';
import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-Dropdown',
  templateUrl: './Dropdown.component.html',
  styleUrls: ['./Dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() hidden:boolean = false
  @Input() iconToShow!:IconDefinition
  @Input() text!:string

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  }

  status():string{
    if(this.hidden){
      return "oculto"
    }else{
      return ""
    }
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

}
