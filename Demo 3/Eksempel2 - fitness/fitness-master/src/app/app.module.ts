import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupWorkoutListComponent } from './workout-list/workout-list.component';
import { SetWorkoutNameComponent } from './set-workout-name/set-workout-name.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    HomeComponent,
    CreateWorkoutComponent,
    WorkoutListComponent,
    PopupWorkoutListComponent,
    SetWorkoutNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
      PopupWorkoutListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
