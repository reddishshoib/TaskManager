import {createAction, props} from "@ngrx/store";
import {Task} from "../../model/task";

export const loadTasks = createAction('[Task] Load Tasks');
export const tasksLoaded = createAction('[Task] Tasks Loaded', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());
