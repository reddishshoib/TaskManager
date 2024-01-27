import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl= 'http://localhost:3000/task'

  constructor(private  http:HttpClient) { }

  getTask(): Observable<Task[]>{
    return  this.http.get<Task[]>(this.apiUrl)
  }

  // Returning the task so omitted
  // addTask(newTask:Task): Observable<Task>{
  //   return  this.http.post<Task>(this.apiUrl,newTask )
  // }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask);
  }
  deleteById(id: number):Observable<HttpResponse<any>>{
    return  this.http.delete(`${this.apiUrl}/${id}`,{observe:'response'});
  }

  getTaskById(id:number): Observable<Task>{
    return  this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(updatedTask: Task):Observable<Task> {
    return  this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`,updatedTask,);
  }
}
