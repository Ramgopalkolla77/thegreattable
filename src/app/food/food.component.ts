import { Component,Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css','../dashboard/dashboard.component.css']
})
export class FoodComponent implements OnInit {

  constructor() { }

  @Input() detailsFoodArray; 

  ngOnInit(): void {
  }

}
