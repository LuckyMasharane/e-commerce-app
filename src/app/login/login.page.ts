import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  constructor(
    private authService: AthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  ngOnInit() {

  }

  tryLogin(){
    this.authService.SignIn(this.validations_form.value.email,this.validations_form.value.password)
    .then(res => {
      this.router.navigate(["/tabs/tab1"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  goRegisterPage(){
    this.router.navigate(["/register"]);
  }
  goResetPage(){
    this.router.navigate(["/resetpassword"]);
  }

}
