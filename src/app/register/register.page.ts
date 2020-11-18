import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // public contactForm: FormGroup;
  // user:User
  constructor(private _formBuilder: FormBuilder,private authent: AthenticationService, private router: Router) { }

  ngOnInit() {
    // this.contactForm = this._formBuilder.group({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: ""
    // });
  }

  // signUp(){
  //   this.authent.signUpUser(this.contactForm.value);
  //   this.authent.getCurrentUser()
  //   this.router.navigate(['/product']);
  // }


}
