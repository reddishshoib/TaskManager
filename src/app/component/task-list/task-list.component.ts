import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TaskService} from "../../service/task.service";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {loadTasks} from "../../store/action/task.action";
import {selectError, selectLoading, selectTasks, selectTaskToEdit} from "../../store/selector/task.selector";
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
  id:number=-2
  constructor(
    private taskService:TaskService,
    private changeDetector:ChangeDetectorRef,
    private store: Store<Task>
  ) {
  }
  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.pipe(select(selectTasks));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  onSaveTask(task:Task){
    this.togglePopUp()
    if (task.id || task.id===0){
      this.store.dispatch(TaskActions.editTask({task}))
    }else{
      this.store.dispatch(TaskActions.saveNew({ task }));
    }
  }

  deletebyid(id: number) {
    this.store.dispatch(TaskActions.deleteById({id}))
  }

  editbyid(id: number) {
    if (!this.isPopUpVisible)  this.togglePopUp()
    this.store.dispatch(TaskActions.getTaskById({id}))
    if (this.id===id) this.togglePopUp()
    this.id=id
  }

  togglePopUp(){
    this.isPopUpVisible = !this.isPopUpVisible
  }

  addTask() {
    this.togglePopUp()
    this.store.dispatch(TaskActions.getTaskById({id:-1}))

  }
}
