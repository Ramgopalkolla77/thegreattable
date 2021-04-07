import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RestDataServiceService {

  constructor(private http:HttpClient) { 
    
  }

  getRestData() {
    return this.http.get('../../assets/data/dashboardData.json');
  }
}
