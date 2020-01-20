import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workout } from '../workout-model/workout';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  workout: Workout;
  token: string;
  apiUri: string = 'https://sheltered-taiga-89356.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router, private ngz: NgZone) { }

  private saveToken(token: string) {
    window.localStorage['loc8r-token'] = token;
  }

  private getToken() {
    if (window.localStorage['loc8r-token']) {
      return this.token = window.localStorage['loc8r-token'];
    }
    else {
      return '';
    }
  }

  private removeToken(token: string) {
    window.localStorage.removeItem(token);
  }



  register(data): Observable<any> {
    let url = `${this.apiUri}/api/user/register`;
    return this.httpClient.post(url, data).pipe(map((res: any) => {

      if (res.error) {
        console.log(res.error);
      }

      else {
        console.log(res.token);
      }

    }));
  }

  login(data): Observable<any> {
    let url = `${this.apiUri}/api/user/login`;
    return this.httpClient.post(url, data).pipe(map((res: any) => {
      if (res) {
        if (res.token) {
          this.saveToken(res.token);
          this.token = res.token;
          console.log(this.token)
          this.ngz.run(() => this.router.navigateByUrl('/'));
        }
      }
    }))
  }



  getWorkout(data): Observable<any> {
    let url = `${this.apiUri}/api/workout/all`;
    return this.httpClient.get(url, data).pipe(map((res: any) => {
      if (!res.error) {
        this.workout = res;
      }
    }))
  }

  createWorkout(WorkoutName: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    let options = { headers: headers };

    let data = {
      Workoutname: WorkoutName
    }

    console.log(WorkoutName)

    let url = `${this.apiUri}/api/workout/`;

    console.log(url)
    return this.httpClient.post(url, data, options).subscribe(data => {
      window.localStorage['workoutID'] = data['newWorkout']['_id'];
      this.ngz.run(() => this.router.navigateByUrl('/createworkout'));
      return console.log(data['newWorkout']['_id']);

    });

  }

  createExercise(exerciseData: any) {

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
      'Content-Type': 'application/json'
    });

    let options = { headers: headers };

    let data = {
      workoutID: exerciseData.workoutID,
      name: exerciseData.name,
      description: exerciseData.description,
      set: exerciseData.set,
      repetitions: exerciseData.repetitions
    }

    console.log(data.name)

    let url = `${this.apiUri}/api/exercise/`;

    console.log(url)
    return this.httpClient.post(url, data, options).subscribe(data => {
      return console.log(data);
    });
  }

  getSingleWorkout(id: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });


    let data =
    {
      workoutID: id
    }

    let options =
    {
      headers: headers
    };

    let url = `${this.apiUri}/api/workout/single`;
    return this.httpClient.post(url, data, options).subscribe(data => console.log(data));
  }

  deleteWorkout(id: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.getToken()
    });

    let data =
    {
      workoutID: id
    }

    let options =
    {
      headers: headers
    };

    let url = `${this.apiUri}/api/workout/delete`;
    return this.httpClient.post(url, data, options).subscribe(data => console.log(data));
  }
}
