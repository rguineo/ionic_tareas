import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  public taskID!: string;
  taskName: string="";

  constructor(private activatedRoute: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {

    this.taskID = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getTask(this.taskID);
  }

  getTask(id: string){
    
  }

}
