import { Component, NgZone, OnInit } from '@angular/core';
import {ApiService} from '../ApiService/ApiService'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  
  loginForm: FormGroup;
  username:string;
  password:string;


  constructor(private apiService:ApiService, private router:Router, public fb: FormBuilder, private ngz: NgZone)
  { 
      this.loginForm = this.fb.group({
        username : '',
        password : ''
      })

   }


  ngOnInit() {
  }


login(event)
{
const target = event.target;
const username = target.querySelector('#username').value;
const password = target.querySelector('#password').value

this.loginForm = this.fb.group({
  username:username,
  password:password
})


this.apiService.login(this.loginForm.value).subscribe((res) => {
  console.log(res);}, (error) => {console.log(error);}

)}
}

