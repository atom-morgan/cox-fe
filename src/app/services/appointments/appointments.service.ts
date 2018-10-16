import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/appointments');
  }

  update(appointment): Observable<object> {
    return this.http.post('http://localhost:8080/api/appointments', appointment);
  }
}
