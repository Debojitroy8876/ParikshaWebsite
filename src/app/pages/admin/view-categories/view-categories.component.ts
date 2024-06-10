import { Component,OnInit } from '@angular/core';
import { CategoryService } from '@app/services/category.service';


@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {
   categories=[
   {
    cid : '',
    title : ' ',
    //description : ' '
   }
   //{
    //cid : 2,
    //title : 'Aptitude question ',
    //description : 'It contains aptitude based questions   '

   
  ];

   
  constructor(private category:CategoryService){}
  ngOnInit():void{
     this.category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      alert("Server error !!");
      
    }
    );
  }

   // DELETE CATEGORY FUNCTION
  deleteCategory(categoryId:any){
    const confirmation = confirm('Are you sure you want to delete this category?');
    if (confirmation) {
        this.category.deleteCategory(categoryId).subscribe(
            (data: any) => {
                this.categories = this.categories.filter((category:any) => category.categoryId != categoryId);
                alert('Categpory deleted successfully');
            },
            (error) => {
                alert('Server error !!');
            }
        );
    }
  }


  }
