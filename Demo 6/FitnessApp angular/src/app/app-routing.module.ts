import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { SetWorkoutNameComponent } from './set-workout-name/set-workout-name.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createworkout', component: CreateWorkoutComponent },
  { path: 'workoutlist', component: WorkoutListComponent },
  { path: 'setworkoutname', component: SetWorkoutNameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
