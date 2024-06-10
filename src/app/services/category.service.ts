import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './Helper.component';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  //load all the categories
  public categories(){
    return this.http.get(`${baseUrl}/category/`);
  }

  public addCategory(category:any){
    return this.http.post(`${baseUrl}/category/`,category);
  }

  //dlete quiz function
  public deleteCategory(categoryId:any){
    return this.http.delete(`${baseUrl}/category/${categoryId}`);
 }
  
}
