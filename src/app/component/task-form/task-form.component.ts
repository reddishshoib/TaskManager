import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../model/task";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() saveTask = new EventEmitter<Task>();
  taskForm :FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.taskForm= this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    });
  }
  onSubmit(){
    if(this.taskForm.valid){
      this.saveTask.emit(this.taskForm.value)
      this.taskForm.reset()
    }
  }
  isFormValid() {
    return this.taskForm.valid;
  }

}
