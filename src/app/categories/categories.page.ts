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

  constructor(private database: DatabaseService) { }

  ngOnInit() {
  }

  addCategory(){
    this.database.addCategory(this.categoryName).then((data) => {
      this.categoryName='';
      alert(data);
      this.getCategory();
    });
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
}
