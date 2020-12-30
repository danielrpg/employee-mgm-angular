import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRestApiService {
  // Define API
  apiURL = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + 'employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  createEmployee(employee: Employee): Observable<Employee> {
    employee.id = Math.floor(Math.random() * 100);
    employee.status = true;
    const employeeData = JSON.stringify(employee);
    return this.http.post<Employee>(this.apiURL + 'employees', employeeData, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + 'employees/'+ id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getSingleEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + 'employees/'+ id);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.apiURL + 'employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(fail: any) {
    let errorMessage = '';
    if(fail.error instanceof ErrorEvent) {
      errorMessage = fail.error.message;
    } else {
      errorMessage = `Error code: ${fail.status} \nMessage: ${fail.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
