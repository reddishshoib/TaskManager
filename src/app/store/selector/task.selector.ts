import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Task, TaskState} from "../../model/task";
import {state} from "@angular/animations";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectTaskToEdit = createSelector(
  selectTaskState,
  (state: TaskState) => state.taskToEdit
);
