import { ProfileService } from 'src/app/Services/Profile.service';
import { Usuario } from './../../../Dominio/Usuario/Usuario';
import { Component, Input, OnInit } from '@angular/core';
import { Destino } from 'src/Dominio/Destino/Destino';

@Component({
  selector: 'app-Friends',
  templateUrl: './Friends.component.html',
  styleUrls: ['./Friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  friendToAddList!:Usuario[]
  selectedOption!:Usuario

  ngOnInit() {
    this.getUsers()
  }

  @Input() friendList!:Array<Usuario>
  @Input() user!:Usuario

  async getUsers() {

    this.friendToAddList = await this.profileService.getUsers()
    this.removeCurrentFriends()
  }

  removeCurrentFriends() {
    
    let auxList = this.friendList.map(friend => friend.username)

    auxList.push(this.user.username)

    this.friendToAddList = this.friendToAddList.filter(user => !auxList.includes(user.username));

  }

  addSelectedFriend(){
    if(this.selectedOption != null){
      this.user.agregarAmigo(this.selectedOption)
      this.getUsers();
    }
    
  }

}
