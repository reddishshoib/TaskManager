import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../../service/task.service';
import * as TaskActions from './../action/task.action';
import {Task} from "../../model/task";
@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTask().pipe(
          map(tasks => TaskActions.tasksLoaded({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  );
  deleteById$ = createEffect(()=>
    this.actions$.pipe(
      ofType(TaskActions.deleteById),
        mergeMap(({id})=>
          this.taskService.deleteById(id).pipe(
            map(()=>TaskActions.deleteByIdSuccess({id})),
            catchError(error => of(TaskActions.deleteByIdFailure({id,error})))
          )
        )
        )
    );

  saveNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.saveNew),
      mergeMap(action =>
        this.taskService.getTask().pipe(
          map(tasks => ({
            tasks,
            newTaskId: this.getNextTaskId(tasks)
          })),
          mergeMap(({ tasks, newTaskId }) =>
            this.taskService.addTask({
              ...action.task,
              id: newTaskId
            }).pipe(
              map(task => TaskActions.saveNewSuccess({ task })),
              catchError(error => of(TaskActions.saveNewFailure({ error })))
            )
          )
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((editedTask) => TaskActions.editSuccessTask({ task: editedTask })),
          catchError((error) => of(TaskActions.editFailureTask({ error })))
        )
      )
    )
  );

  loadTaskById$= createEffect(()=>
  this.actions$.pipe(
    ofType(TaskActions.getTaskById),
    mergeMap(({id})=>
    this.taskService.getTaskById(id).pipe(
      map(task=> TaskActions.getTaskByIdSuccess({task})),
      catchError(error => of(TaskActions.getTaskByIdFailure({error})))
    )
  )));

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  getNextTaskId(tasks: Task[]): number {
    const maxId = Math.max(...tasks.map(task => task.id), 0);
    return maxId + 1;
  }
}
