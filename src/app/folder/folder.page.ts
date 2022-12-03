import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  cuerpo: any;
  tasks: any = [];

  constructor(private activatedRoute: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {
    this.getTask();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // if (this.folder == "Archived"){
    //   this.cuerpo = " Selecciono menu ARCHIVED";
    // }

    // if(this.folder == "Outbox"){
    //   this.cuerpo = " Selecciono menu OUTBOX";
    // }

    switch (this.folder){
      case "Archived":
        this.cuerpo = "Selecciono menu ARCHIVED";
        break;
      case "Outbox":
        this.cuerpo = "Selecciono menu OUTBOX";
        break;
      case "Favorites":
        this.cuerpo = "Selecciono menu FAVORITES";
        break;
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
