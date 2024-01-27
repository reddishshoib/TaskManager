import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "../../model/task";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export  const selectTasks = createSelector(
  selectTaskState,
  (state:TaskState)=>state.tasks
)
