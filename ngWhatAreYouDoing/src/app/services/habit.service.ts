import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Habit } from '../models/habit';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private url = environment.baseUrl + 'api/habits';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private datePipe: DatePipe
  ){}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(
          () =>
            new Error('HabitService.index(): error retrieving habit list: ' + err)
        );
      })
    );
  }

  show(habitId: number): Observable<Habit> {
    return this.http.get<Habit>(this.url + '/' + habitId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('HabitService.show(): error retrieving habit: ' + err)
        );
      })
    );
  }

  create(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.url, habit, this.getHttpOptions());
  }

  update(id: number, habit: Habit): Observable<Habit> {
    if (habit.completed) {
      habit.completeDate = this.datePipe.transform(
        Date.now(),
        'shortDate'
      ) as string;
    } else {
      habit.completeDate = null;
    }
    return this.http.put<Habit>(`${this.url}/${id}`, habit, this.getHttpOptions());
  }

  delete(habitId: number): Observable<void> {
    const url = `${this.url}/${habitId}`;
    return this.http.delete<void>(url, this.getHttpOptions());
  }
}
