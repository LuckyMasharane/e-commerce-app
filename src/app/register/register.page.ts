import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service';
import { User } from '../user';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
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
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  ngOnInit() {

  }

  tryRegister() {
    let message = ""
    this.authService.RegisterUser(this.validations_form.value.email, this.validations_form.value.password)
      .then(res => {

        if (res) {
          message = "successfully registered";
      
          firebase.default.database().ref('costumers/' + res.user.uid).set({
      
            firstName: this.validations_form.value.firstName,
            email: this.validations_form.value.email,
            lastName: this.validations_form.value.lastName,
            password: this.validations_form.value.password
          });
          console.log(message);
      
        } else {
      
        }
        this.router.navigate(["/product"]);
      }, err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }

  goLoginPage() {
    this.router.navigate(["/login"]);
  }

  



}
