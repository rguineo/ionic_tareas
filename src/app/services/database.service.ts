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

    await this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS ${this.tables.tasks} (id INTEGER NOT NULL AUTOINCREMENT, task_name TEXT, date_start DATE, date_end DATE, status VARCHAR(50), id_category INTEGER, FOREIGN KEY (id_category) REFERENCES ${this.tables.categories}(id))`, []);
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
    return this.databaseObj.executeSql(`UPDATE ${this.tables.categories} SET name = ${name} WHERE id = ${id}`).then(() => {
      return "Categoria Actualizada";
    }).catch((e) => {
      if(e.code === 6){
        return "La categoria ya existe";
      }
      return "Error al actualizar " + JSON.stringify(e);
    });
  }




}
