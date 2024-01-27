import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../../service/task.service';
import * as TaskActions from './../action/task.action';

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

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}
