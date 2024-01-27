import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TaskService} from "../../service/task.service";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {loadTasks} from "../../store/action/task.action";
import {selectError, selectLoading, selectTasks} from "../../store/selector/task.selector";
import * as TaskActions from '../../store/action/task.action';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  tasks:Task[]=[]
  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  isPopUpVisible:boolean =  false
  taskToEdit: Task | null = null;
  togglePopUp(){
    this.isPopUpVisible = !this.isPopUpVisible
  }

  constructor(
    private taskService:TaskService,
    private changeDetector:ChangeDetectorRef,
    private store: Store<Task>
  ) {  }
  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.pipe(select(selectTasks));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  onSaveTask(task:Task){
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
      this.store.dispatch(TaskActions.saveNew({ task }));
    }
  }

  deletebyid(id: number) {
    this.store.dispatch(TaskActions.deleteById({id}))
  }

  getNextTaskId(): number {
    const maxId = Math.max(...this.tasks.map(task => task.id), 0);
    return maxId + 1;
  }

  editbyid(id: number) {
    this.taskService.getTaskById(id).subscribe(
      (task:Task)=>{
        this.taskToEdit=task;
        this.togglePopUp()
      },
      (error) => {
        console.log('Error',error)
      }
    )
  }
}
