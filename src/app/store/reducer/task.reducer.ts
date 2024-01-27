import {createReducer, on} from "@ngrx/store";
import {initialState} from "../state/task.state";
import * as TaskActions from  "../action/task.action"
import {state} from "@angular/animations";
export const taskReducer = createReducer(
  initialState,
  on(TaskActions.taskLoaded, (state, { tasks }) => {
    console.log('Tasks received in reducer:', tasks);
    return { ...state, tasks };
  }),
  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.updateTask,(state, {task})=>({
    ...state,
    tasks: state.tasks.map(t => t.id === t.id ? {...t, ...task} : t)
  })),
  on(TaskActions.deleteTask,(state,{id})=>({
    ...state,
    tasks:state.tasks.filter(task=>task.id!=id)
  }))
  )
