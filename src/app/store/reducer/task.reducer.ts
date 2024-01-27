import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/task.state";
import * as TaskActions from  "../action/task.action"
import {state} from "@angular/animations";
export const taskReducer = createReducer(
  initialState,
  on(TaskActions.tasksLoaded, (state, { tasks }) => ({ ...state, tasks, loading: false })),
  on(TaskActions.deleteByIdSuccess,(state,{id})=>({
    ...state,
    tasks:state.tasks.filter(task=>task.id!=id)
  })),
  on(TaskActions.saveNewSuccess,(state,{task})=>({
    ...state,
    tasks: [...state.tasks,task]
  }))
  )
