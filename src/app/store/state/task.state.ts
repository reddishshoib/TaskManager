import { TaskState} from "../../model/task";

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error:null,
  taskToEdit: null,
};
