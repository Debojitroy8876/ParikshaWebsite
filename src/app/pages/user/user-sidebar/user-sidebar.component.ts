import { Component,OnInit } from '@angular/core';
import { CategoryService } from '@app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit {
  categories:any;
  constructor(private _category:CategoryService){}
  ngOnInit(): void {
      this._category.categories().subscribe(
        (data:any)=>{
          this.categories=data;
          console.log(this.categories);
          
        },
        (error)=>{
          alert('Error in loading categories from server !!');
        }
      )
  }
}
