import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
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
      ]))
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("reset");

    this.authService.PasswordRecover(this.validations_form.value.email)
    this.router.navigate(['/login']);
  }

}
