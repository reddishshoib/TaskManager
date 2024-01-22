import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TaskService} from "../../service/task.service";
import {max} from "rxjs";

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

  constructor(
    private taskService:TaskService,
    private changeDetector:ChangeDetectorRef
  ) {  }
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
    task.id = this.getNextTaskId();
    this.tasks.push(task);
    console.log(task.id)
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

  deletebyid(id: number) {
    console.log(id);
    this.taskService.deleteById(id).subscribe(
      (response)=>{
        if (response.status ===200){
          console.log('Deleted Succefully')
          this.tasks= this.tasks.filter(task=>task.id!==id)
          this.changeDetector.detectChanges()
        }
      }
    )
  }

  getNextTaskId(): number {
    const maxId = Math.max(...this.tasks.map(task => task.id), 0);
    return maxId + 1;
  }

}
