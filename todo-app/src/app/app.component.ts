import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoTask } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  public taskForm: FormGroup;
  public toDosList: ToDoTask[] = [];
  public appState: AppStateList = AppStateList.LISTA;
  public appStateList = AppStateList;


  constructor(private formBuilder: FormBuilder) {

    this.taskForm = this.formBuilder.group({
      title:['333', Validators.compose([
      Validators.maxLength(60),
       Validators.minLength(3),
        Validators.required,
      ])]
      });

      this.loadToDoList();
  }

  changeAppState(newState: AppStateList) {
    this.appState = newState;
  }

  addTask() {
    let title = this.taskForm.controls['title'].value;
    let id = this.toDosList.length + 1;

    this.toDosList.push(new ToDoTask(id,title, false));
    this.saveTask();
    this.clearForm();
    this.changeAppState(AppStateList.LISTA);
  }

  removeTask(toDoTask: ToDoTask) {
    let index = this.toDosList.indexOf(toDoTask);
    if(index ===1) {
      this.toDosList.splice(index, 1);
    }
    this.saveTask();
  }

  clearForm() {
    this.taskForm.reset();
  }

  markAsDone(toDoTask: ToDoTask) {
    toDoTask.isDone = true;
    this.saveTask();
  }
  markAsUndone(toDoTask: ToDoTask) {
    toDoTask.isDone = false;
    this.saveTask();
  }

  saveTask() {
    const toDoListString = JSON.stringify(this.toDosList);
    localStorage.setItem('toDoList', toDoListString);
  }

  loadToDoList() {
    const savedToDoList = localStorage.getItem('toDoList');

    if(savedToDoList == undefined) {
       this.toDosList = [];
       return;
    }

    this.toDosList = JSON.parse(savedToDoList);
  }
}

enum AppStateList {
  LISTA = 'lista',
  NOVA_TAREFA = 'nova_tarefa'
}

