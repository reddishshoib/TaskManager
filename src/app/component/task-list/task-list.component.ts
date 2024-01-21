import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks:Task[]=[]
  isPopUpVisible:boolean =  false
  togglePopUp(){
    this.isPopUpVisible = !this.isPopUpVisible
  }

  constructor(private taskService:TaskService) {
  }
  ngOnInit() {
    this.taskService.getTask().subscribe((tasks)=>{
      this.tasks=tasks
    },
      (error)=>{
      console.log("Data Not found",error);
      }
    );
  }

  onSaveTask(task:Task){
    console.log(task)
    this.taskService.addTask(task).subscribe(
      (response)=>{
        if (response.ok){
          console.log("Task Added Successfully", response.status)
        }else{
          console.log("Task Not Added")
        }
      },
      error => {
        console.log("Error saving task",error);
      }
    )
  }

  delete(id: number) {
    
  }
}
