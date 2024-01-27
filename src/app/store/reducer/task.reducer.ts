import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/task.state";
import * as TaskActions from  "../action/task.action"
import {state} from "@angular/animations";
export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({ ...state, loading: true })),
  on(TaskActions.tasksLoaded, (state, { tasks }) => ({ ...state, tasks, loading: false })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error, loading: false }))
  )
