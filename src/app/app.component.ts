import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Nueva Tarea', url: '/new-task', icon: 'add-circle' },
    { title: 'Categorias', url: '/categories', icon: 'bookmarks' },
    { title: 'Tareas', url: '/tasks', icon: 'calendar' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  tasks: any = [];

  constructor(private database: DatabaseService) {
    this.database.createDataBase();
  }

}
