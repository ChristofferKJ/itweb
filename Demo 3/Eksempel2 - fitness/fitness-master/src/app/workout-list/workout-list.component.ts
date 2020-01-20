import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../ApiService/ApiService';
import { Workout } from '../workout-model/workout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})



export class WorkoutListComponent implements OnInit {

  Workouts: Workout[] = [];
  registerForm: FormGroup;
  workouts1: Workout;

  constructor(private apiService: ApiService, public fb: FormBuilder, public dialog : MatDialog, public router:Router) {

    
    this.registerForm = this.fb.group({
      workouts1: []
    })

    this.apiService.getWorkout(this.registerForm.value).subscribe((res) => {
            this.Workouts = Array.of(this.apiService.workout);
    },
      (error) => {
        console.log(error);
      })
  }


  ngOnInit() {
  }

 async  deleteWorkout(index) 
  {

    let id; 
    
    this.Workouts.forEach(workout => {
      id =  workout['Workouts'][index]._id;     
    });

    this.apiService.deleteWorkout(id);
    
    await this.delay(300);

    this.redirectTo('/workoutlist');
}

tempWorkout: Workout;


 delay(ms: number)
{
 return new Promise(resolve => setTimeout(resolve, ms));
}

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));}

  openDialog(index) : void 
  {
    this.tempWorkout =  this.Workouts[0].Workouts[index];

    console.log(this.tempWorkout);

    const dialogRef = this.dialog.open
    (PopupWorkoutListComponent, 
      {width: '400px', 
      data: this.tempWorkout
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 
  }
}


@Component({
  selector: 'app-workout-list-popup',
  templateUrl: './workout-list-popup.html'
})

export class PopupWorkoutListComponent
{
constructor(
  public dialogRef: MatDialogRef<PopupWorkoutListComponent>,@Inject(MAT_DIALOG_DATA) public data: Workout)
{}

onNoClick(): void{
  this.dialogRef.close();
}

}
