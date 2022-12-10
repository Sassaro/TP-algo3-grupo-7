import { Component, Input, OnInit } from '@angular/core';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-Score',
  templateUrl: './Score.component.html',
  styleUrls: ['./Score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faStar = faStar
  faStarEmpty = faStarEmpty

  @Input() score!:number
  @Input() starsToCreate!:Array<number>
  @Input() emptyStars!:Array<number>

}
