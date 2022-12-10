import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBars, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  faDoorOpen = faDoorOpen
  faBars = faBars

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getUserId(){
    return this.route.snapshot.paramMap.get('userId');
  }

}
