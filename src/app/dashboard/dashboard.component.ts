import { Component, OnInit } from '@angular/core';
import { RestDataServiceService } from './service/data-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [RestDataServiceService]
})
export class DashboardComponent implements OnInit {
  constructor(private restDataService: RestDataServiceService) {
  }
   
  data = null;
  categories = [];
  subCategory = [];
  listOfFoods = [];
  quantity = 0;
  shoppingCart = {};
  drinksTotal = 0;
  foodTotal = 0;
  desertsTotal = 0;

  ngOnInit(): void {
    this.restDataService.getRestData().toPromise().then(d => {
      this.data = d;
      Object.keys(this.data).forEach((value) => {
        this.categories.push(value);
        this.shoppingCart[value] = [];
        this.data[value].forEach((food) => {
          this.listOfFoods.push(food);
          if (!this.subCategory.includes(food.Catergory)) {
            this.subCategory.push(food.Catergory);
          }
        });
      });
    })
  }

  filterCategory(cat) {
    this.listOfFoods = this.data[cat];
    this.subCategory = [];
    this.data[cat].forEach((food) => {
      if (!this.subCategory.includes(food.Catergory)) {
        this.subCategory.push(food.Catergory);
      }
    });
  }

  filterSubCategory(subCat) {
    this.listOfFoods = [];
    Object.keys(this.data).forEach((value) => {
      this.data[value].forEach((food) => {
        if (food.Catergory === subCat) { this.listOfFoods.push(food); }
      });
    });
  }

  checkQuantityPlus(x) {
    x.Quantity++;
    if (this.shoppingCart[x.type].length === 0) {
      this.shoppingCart[x.type].push(x);
    } else {
      let foundIndex = this.shoppingCart[x.type].findIndex(
        (e) => e.Name === x.Name
      );
      if (foundIndex === -1) {
        this.shoppingCart[x.type].push(x);
      } else {
        this.shoppingCart[x.type][foundIndex].Quantity = x.Quantity;
      }
    }

    this.shoppingCart[x.type].forEach((element) => {
      if (x.Name === element.Name) {
        if (x.type === 'Drinks') {
          this.drinksTotal += element.Price;
        }
        else if (x.type === 'Food') {
          this.foodTotal += element.Price;
 }
        else if (x.type === 'Deserts') {
          this.desertsTotal += element.Price;
 }
      }
    });
  }
  checkQuantityMinus(y) {
    if (y.Quantity !== 0) {
      y.Quantity--;
      if (this.shoppingCart[y.type].length !== 0) {
        let foundIndex = this.shoppingCart[y.type].findIndex(
          (e) => e.Name === y.Name
        );
        if (foundIndex !== -1) {
          if (y.Quantity === 0) {
            this.shoppingCart[y.type].splice(foundIndex, 1);
          } else {
            this.shoppingCart[y.type][foundIndex].Quantity = y.Quantity;
          }
        }
      }
    }
  }
}
