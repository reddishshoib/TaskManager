import {createAction, props} from "@ngrx/store";
import {Task} from "../../model/task";

export const loadTasks= createAction('[Task] Load Tasks')
export const taskLoaded = createAction('[Task] Task Loaded',props<{tasks:Task[]}>())
export const addTask = createAction(('[Task] Add Task'),props<{task:Task}>())
export  const updateTask = createAction('[Task] Update Task',props<{task:Task}>())
export const deleteTask = createAction('[Task] Delete Task', props<{id:number}>())
