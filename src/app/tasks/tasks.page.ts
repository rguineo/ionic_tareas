import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tasks: any = [];

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.getTask();
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

  delTask(id: number){
    this.database.deleteTask(id).then((data) => {
      alert("Tarea Eliminada");
      this.getTask();
    });
  }

}

