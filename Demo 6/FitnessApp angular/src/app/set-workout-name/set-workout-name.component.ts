import { Component, OnInit } from '@angular/core';
import {ApiService} from '../ApiService/ApiService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-workout-name',
  templateUrl: './set-workout-name.component.html',
  styleUrls: ['./set-workout-name.component.scss']
})
export class SetWorkoutNameComponent implements OnInit {


  constructor(private apiService:ApiService) {

  }

  ngOnInit() {
  }

  addWorkout(event) {
    event.preventDefault();
    const target = event.target;
    const workoutName = target.querySelector('#name').value;
    console.log(workoutName)
    this.apiService.createWorkout(workoutName);
  }
}
