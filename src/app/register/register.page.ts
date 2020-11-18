import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // // public contactForm: FormGroup;
  // // user:User
  // constructor(private _formBuilder: FormBuilder,private authent: AthenticationService, private router: Router) { }

  // ngOnInit() {
  //   // this.contactForm = this._formBuilder.group({
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   email: "",
  //   //   password: ""
  //   // });
  // }

  // // signUp(){
  // //   this.authent.signUpUser(this.contactForm.value);
  // //   this.authent.getCurrentUser()
  // //   this.router.navigate(['/product']);
  // // }

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
  ) { }

  ngOnInit() {
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

  tryRegister(value){
    this.authService.signUpUser(value)
  }

  goLoginPage(){
    this.router.navigate(["/login"]);
  }



}
