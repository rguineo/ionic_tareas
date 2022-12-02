import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObj!: SQLiteObject;

  tables = {
    categories: "category",
    tasks: "tasks"
  }
  constructor(private sqlite: SQLite) { }

  async createDataBase(){
    await this.sqlite.create({
      name: 'task',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
    }).catch((e) => {
      alert("Error al crear la BD " + JSON.stringify(e));
    });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.categories} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL)`, []);

    await this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.tasks} (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      task_name TEXT, 
      date_start TEXT, 
      date_end TEXT, 
      status VARCHAR(50), 
      id_category INTEGER, 
      FOREIGN KEY (id_category) REFERENCES ${this.tables.categories}(id))`, []);
  }

  async addCategory(name: string){
    return this.databaseObj.executeSql(`INSERT INTO ${this.tables.categories} (name) VALUES('${name}')`, []).then(() => {
      return "Categoria Creada";
    }).catch((e) => {
      if(e.code === 6){
        return "Categoria ya existe";
      }
      return "Error creando categoria " + JSON.stringify(e);
    });
  }

  async getCategories(){
    return this.databaseObj.executeSql(`SELECT * FROM ${this.tables.categories} ORDER BY name ASC`, []).then((res) => {
      return res;
    }).catch((e) => {
      return "Error al buscar categoria " + JSON.stringify(e);
    });
  }

  async deleteCategory(id: number){
    return this.databaseObj.executeSql(`DELETE FROM ${this.tables.categories} WHERE id = ${id}`, []).then(() => {
      return "Categoria Eliminada";
    }).catch((e) => {
      return "Error al eliminar categoria " + JSON.stringify(e);
    });
  }

  async updateCategory(name: string, id: number){
    return this.databaseObj.executeSql(`UPDATE ${this.tables.categories} SET name = '${name}' WHERE id = ${id}`, []).then(() => {
      return "Categoria Actualizada";
    }).catch((e) => {
      if(e.code === 6){
        return "La categoria ya existe";
      }
      return "Error al actualizar " + JSON.stringify(e);
    });
  }

  async addTask(name: string, date_start: string, date_end: string, status: string, id_category: number){
    return this.databaseObj.executeSql(`INSERT INTO ${this.tables.tasks} (task_name, date_start, date_end, status, id_category) VALUES('${name}', '${date_start}', '${date_end}', '${status}', ${id_category})`, []).then(() => {
      return "Tarea Creada";
    }).catch((e) => {
      if(e.code === 6){
        return "Tarea ya existe";
      }
      return "Error creando Tarea " + JSON.stringify(e);
    });
  }

  async getTask(){
    return this.databaseObj.executeSql(`SELECT ${this.tables.tasks}.id, ${this.tables.tasks}.task_name, ${this.tables.tasks}.date_start, ${this.tables.tasks}.date_end, ${this.tables.tasks}.status, ${this.tables.categories}.name  FROM tasks 
    INNER JOIN category
    ON ${this.tables.categories}.id = ${this.tables.tasks}.id_category
    ORDER BY task_name ASC`, []).then((res) => {
      return res;
    }).catch((e) => {
      return "Error al buscar tarea " + JSON.stringify(e);
    });
  }

  async updateTask(name: string, id: number, dateStart: Date, dateEnd: Date, status: string, id_category: number){
    return this.databaseObj.executeSql(`UPDATE ${this.tables.tasks} 
    SET task_name = '${name}',
    dateStart = ${dateStart},
    dateEnd = ${dateEnd},
    status = '${status}',
    id_category = ${id_category}
    WHERE id = ${id}`, []).then(() => {
      return "Tarea Actualizada";
    }).catch((e) => {
      if(e.code === 6){
        return "La tarea ya existe";
      }
      return "Error al actualizar tarea " + JSON.stringify(e);
    });
  }

  async deleteTask(id: number){
    return this.databaseObj.executeSql(`DELETE FROM ${this.tables.tasks} WHERE id = ${id}`, []).then(() => {
      return "Tarea Eliminada";
    }).catch((e) => {
      return "Error al eliminar Tarea " + JSON.stringify(e);
    });
  }
}
