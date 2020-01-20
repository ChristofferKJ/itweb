import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../ApiService/ApiService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username:string;
  password:string;
  confirm_password:string;

  constructor(private apiService:ApiService, private router:Router, public fb: FormBuilder, private ngz: NgZone)
  {
    this.registerForm = this.fb.group({
      username : '',
      password : '', 
      confirm_password : ''
    })

  }

  ngOnInit() {
  }


  register(event) 
  {
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const confirm_password = target.querySelector('#confirm_password').value;

    this.registerForm = this.fb.group({
      username:username,
      password:password,
      confirm_password:confirm_password
    })

    this.apiService.register(this.registerForm.value).subscribe((data) => {
      console.log(data);},
      (error) => {console.log(error);}
    )
  }
}
