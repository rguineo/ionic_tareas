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
  constructor(private activatedRoute: ActivatedRoute, private database: DatabaseService) { 
    this.database.createDataBase();
  }

  ngOnInit() {
    this.task = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.task == "new"){
      this.title = "Nueva Tarea"
    }
  }

}
