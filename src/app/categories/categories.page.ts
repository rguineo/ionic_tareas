import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categoryName: string = "";
  categories: any = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getCategory();
  }

  addCategory(){

    if(!this.categoryName.length){
      alert("Ingrese una categoria");
      return;
    }

    if(this.editMode){
      // UpdateCategory
      this.database.updateCategory(this.categoryName, this.editId).then((data) => {
        this.categoryName =  '';
        (this.editMode = false), (this.editId = 0);
        alert(data);
        this.getCategory();
      });
    }else {
      //addCategory
      this.database.addCategory(this.categoryName).then((data) => {
        this.categoryName='';
        alert(data);
        this.getCategory();
      });
    }

  }

  getCategory(){
    this.database.getCategories().then((data) => {
      this.categories = [];
      if(data.rows.length > 0){
        for(var i=0; i < data.rows.length; i++){
          this.categories.push(data.rows.item(i));
        }
      }
    });
  }

  delCategory(id: number){
    this.database.deleteCategory(id).then((data) => {
      alert("Categoria Eliminada");
      this.getCategory();
    });
  }

  editCategory(category: any){
    this.editMode=true;
    this.categoryName= category.name;
    this.editId = category.id;
  }

}
