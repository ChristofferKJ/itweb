import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiService } from '../ApiService/ApiService';
import { Exercise } from '../workout-model/exercise';
import { Workout } from '../workout-model/workout';



@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {
  displayedColumns: string[] = ['exercise', 'sets', 'timeAndReps', 'description'];
  dataSource = new MatTableDataSource<Exercise>()

  public workout: Workout = { _id: '', name: '', exercises: [], userid: '' }
  public exercises: Array<Exercise>
  private tempData = []


  ngOnInit() {
  }

  constructor(private httpClient: HttpClient, private apiService: ApiService) {

  }

  addExercise(event) {

    console.log("Added exercise")

    const target = event.target;
    const name = target.querySelector('#exercise').value;
    const set = target.querySelector('#sets').value;
    const repetitions = target.querySelector('#timeAndReps').value;
    const description = target.querySelector('#description').value;

    var exercise = {
      workoutID: window.localStorage['workoutID'],
      name: name,
      set: set,
      repetitions: repetitions,
      description: description
    };

    this.tempData.push(exercise)
    this.exercises = this.tempData
    this.dataSource.data = this.exercises

    console.log(this.exercises.length)
    console.log(exercise.workoutID)

    this.apiService.createExercise(exercise);

  }

}

