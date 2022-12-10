import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DestinationService } from 'src/app/Services/Destination.service';
import { Destino } from 'src/Dominio/Destino/Destino';

@Component({
  selector: 'app-Add_Destination_Menu',
  templateUrl: './Add_Destination_Menu.component.html',
  styleUrls: ['./Add_Destination_Menu.component.css']
})
export class Add_Destination_MenuComponent implements OnInit {

  destinationList:Destino[] = []
  selectedValue!:Destino
  @Input() isOn:boolean = false
  @Input() userDestinationList:Destino[] = []
  @Output() onClick = new EventEmitter<boolean>();

  constructor(private destinationService:DestinationService) { }

  ngOnInit() {
    this.obtenerTodosLosDestinos()
  }

  filterDestination() {
    
    let auxList = this.userDestinationList.map(destination => destination.id)
    this.destinationList = this.destinationList.filter(destination => !auxList.includes(destination.id))
    
  }

  async obtenerTodosLosDestinos() {
    this.destinationList = await this.destinationService.getDestinationList()
    this.filterDestination()
  }

  close(){
    this.onClick.emit(false)
  }

  accept(){
    this.userDestinationList.push(this.selectedValue)
    this.close()
  }

}
