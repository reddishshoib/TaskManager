import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from "../../model/task";
import {selectTaskToEdit} from "../../store/selector/task.selector";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() saveTask = new EventEmitter<Task>();
  @Input() addTask!:boolean
  taskForm: FormGroup;
  taskToEdit$ : Observable<Task | null>


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>
  ) {
    this.taskForm = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      description: ['']
    });
    this.taskToEdit$ = this.store.pipe(select(selectTaskToEdit));

  }

  ngOnInit() {
    if (this.addTask){
      this.taskForm.setValue({
        id: null,
        title:  '',
        description: ''
      });
    }else{
      this.taskToEdit$.subscribe(task => {
        if (task) {
          this.initForm(task);
        }
      });
    }
  }

  initForm(task: Task) {
    this.taskForm.setValue({
      id: task.id,
      title: task.title || '',
      description: task.description || ''
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.saveTask.emit(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  isFormValid() {
    return this.taskForm.valid;
  }
}
