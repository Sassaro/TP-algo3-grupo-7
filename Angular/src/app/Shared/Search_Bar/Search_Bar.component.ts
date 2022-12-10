import { Component, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-Search_Bar',
  templateUrl: './Search_Bar.component.html',
  styleUrls: ['./Search_Bar.component.css']
})
export class Search_BarComponent implements OnInit {

  palabraBuscada=""
  @Output() search = new EventEmitter<string>();
  
  

  constructor() { }

  ngOnInit() {
  }
  
  searchThis(){
    this.search.emit(this.palabraBuscada)
  }

  faMagnifyingGlass = faMagnifyingGlass

}
