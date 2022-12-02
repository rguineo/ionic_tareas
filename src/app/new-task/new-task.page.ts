import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { formatInTimeZone } from 'date-fns-tz';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  task: any;
  title: any;
  categories: any = [];
  tasks: any = [];
  categoryId: number = 0;
  taskName: any;
  dateStart!: Date;
  dateEnd!: Date;
  status: any;
  editMode: boolean = false;
  editId: number = 0;

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

  addTask(){
    if(!this.taskName.length){
      alert("Ingrese nombre Tarea");
      return;
    }

    if(this.editMode){
      // UpdateCategory

      alert(this.taskName + " | "+ this.editId + " | Start: " + this.dateStart + " | End:  " + this.dateEnd + " | " + this.status + " | " + this.categoryId);
      this.database.updateTask(this.taskName, this.editId, this.dateStart, this.dateEnd, this.status, this.categoryId).then((data) => {
        this.taskName =  '';
        (this.editMode = false), (this.editId = 0);
        alert(data);
        this.getTask();
      });
    }else {
      //addCategory
      // alert(this.taskName + " | "+ this.editId + " | Start: " + formatInTimeZone(this.dateStart, 'America/Santiago', 'dd-MM-yyyy HH:mm') + " | End:  " + formatInTimeZone(this.dateEnd, 'America/Santiago', 'dd-MM-yyyy HH:mm') + " | status: " + this.status + " | id Category:  " + this.categoryId);

      this.database.addTask(this.taskName, formatInTimeZone(this.dateStart, 'America/Santiago', 'dd-MM-yyyy HH:mm'), formatInTimeZone(this.dateEnd, 'America/Santiago', 'dd-MM-yyyy HH:mm'), this.status, this.categoryId).then((data) => {
        this.taskName='';
        alert(data);
      });
    }
  }

  getTask(){
    this.database.getTask().then((data) => {
      this.tasks = [];
      if(data.rows.length > 0){
        for(var i=0; i < data.rows.length; i++){
          this.tasks.push(data.rows.item(i));
        }
      }
    });
  }


}
