export interface Task {
  id:number,
  title:string,
  description:string
}

export interface TaskState {
  tasks: Task[];
  loading: boolean,
  error:any,
  editing?:boolean
}
