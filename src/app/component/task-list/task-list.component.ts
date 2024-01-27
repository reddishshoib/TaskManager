import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../../store/model/task";
import {TaskService} from "../../service/task.service";
import {Store} from "@ngrx/store";
import {taskLoaded} from "../../store/action/task.action";
import  * as TaskActions from "./../../store/action/task.action"
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks:Task[]=[]
  isPopUpVisible:boolean =  false
  taskToEdit: Task | null = null;
  togglePopUp(){
    this.isPopUpVisible = !this.isPopUpVisible
  }

  constructor(
    private taskService:TaskService,
    private changeDetector:ChangeDetectorRef,
    private  store:Store<Task>
  ) {  }
  ngOnInit() {

    //experimenting with reducer
    const taskArray: Task[] = [
      { id: 9, title: 'Task 1', description: 'Description 1' },
      { id: 10, title: 'Task 2', description: 'Description 2' },
    ];

    this.store.dispatch(taskLoaded({ tasks: taskArray }));
    this.taskService.getTask().subscribe((tasks)=>{
      this.tasks=tasks;
      this.tasks= [...this.tasks,...taskArray]

    },
      (error)=>{
      console.log("Data Not found",error);
      }
    );
  }

  onSaveTask(task:Task){
    console.log(task.id,'hello')
    this.store.dispatch(TaskActions.addTask({task}))
    if (task.id || task.id===0){
      const index = this.tasks.findIndex(t => t.id === task.id);
      this.tasks[index] = task;
      this.taskService.updateTask(task).subscribe(
        (response)=>{
          if (response.ok){
            console.log('Task Updated Successfully', response.status)
            this.isPopUpVisible = !this.isPopUpVisible
          }else {
            console.log('Task Not Updated')
          }
        },
        (error)=>{
          console.log('Error  Updating task', error)
        }
      )
    }else{
      task.id = this.getNextTaskId();
      this.tasks.push(task);
      this.taskService.addTask(task).subscribe(
        (response)=>{
          if (response.ok){
            console.log("Task Added Successfully", response.status)
            this.isPopUpVisible = !this.isPopUpVisible
          }else{
            console.log("Task Not Added")
          }
        },
        error => {
          console.log("Error saving task",error);
        }
      )
    }
  }

  deletebyid(id: number) {
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

  editbyid(id: number) {
    this.taskService.getTaskById(id).subscribe(
      (task:Task)=>{
        this.taskToEdit=task;
        // console.log(this.taskToEdit)
        this.togglePopUp()
      },
      (error) => {
        console.log('Error',error)
      }
    )
  }
}
