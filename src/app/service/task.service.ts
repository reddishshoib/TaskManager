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

  //Returning the task so ommited
  // addTask(newTask:Task): Observable<Task>{
  //   return  this.http.post<Task>(this.apiUrl,newTask )
  // }
  addTask(newTask: Task): Observable<HttpResponse<any>> {
    return this.http.post(this.apiUrl, newTask, { observe: 'response' });
  }
  deleteById(id: number):Observable<HttpResponse<any>>{
    return  this.http.delete(`${this.apiUrl}/${id}`,{observe:'response'})
  }
}
