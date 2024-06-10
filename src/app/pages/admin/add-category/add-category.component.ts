import { Component,OnInit} from '@angular/core';
import { CategoryService } from '@app/services/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description: '',
  };
constructor(private _category:CategoryService){}

ngOnInit():void{}

  formSubmit(){
     if(this.category.title.trim()==''|| this.category.title==null){
         alert('title required!!');
       return;
    }
       
    this._category.addCategory(this.category).subscribe(
    (data:any)=>{
      alert('Category added succesfully!! ');
    },
    (error)=>{
      console.log(error);
      alert('Server error');
    }
  );
  
}

}
