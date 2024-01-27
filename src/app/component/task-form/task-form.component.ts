import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../store/model/task";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() saveTask = new EventEmitter<Task>();
  @Input() task:Task | null = null
  taskForm :FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.taskForm= this.formBuilder.group({
      id: null,
      title:['',Validators.required],
      description:['']
    });
  }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    if (this.task){
      this.taskForm.setValue({
        id: this.task.id  ,
        title: this.task.title || '',
        description:this.task.description || ''
      });
    }else {
      this.taskForm.reset()
    }
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
