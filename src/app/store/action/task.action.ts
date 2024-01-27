import {createAction, props} from "@ngrx/store";
import {Task} from "../../model/task";

export const loadTasks = createAction('[Task] Load Tasks');
export const tasksLoaded = createAction('[Task] Tasks Loaded', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const deleteById = createAction('[Task] Delete Task By Id',props<{id:number}>())
export const deleteByIdSuccess = createAction('[Task] Delete Task By Id SUCCESS',props<{id:number}>())
export const deleteByIdFailure = createAction('[Task] Delete Task By Id FAILURE',props<{id:number,error:any }>())
