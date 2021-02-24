import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  public taskForm: FormGroup;
  public Todos: [] = [];
  public appState: AppStateList = AppStateList.HOME;


  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title:['333', Validators.compose([
      Validators.maxLength(60),
       Validators.minLength(3),
        Validators.required,
      ])]
      });
      //this.load();
  }

  changeAppState(newState: AppStateList) {
    this.appState = newState;
  }
  addTask() {}
  removeTask() {}
  clearForm() {
    this.taskForm.reset();
  }
  markAsDone() {}
  markAsUndone() {}
  saveTask() {}
  load() {}


}

enum AppStateList {
  HOME = 'home',
  NOVA_TAREFA = 'nova_tarefa'
}

