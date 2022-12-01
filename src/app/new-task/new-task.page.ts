import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  task: any;
  title: any;
  categories: any = [];
  constructor(private activatedRoute: ActivatedRoute, private database: DatabaseService) {}

  ngOnInit() {
    this.getCategory();
    this.task = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.task == "new"){
      this.title = "Nueva Tarea"
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




}
