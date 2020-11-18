import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public contactForm: FormGroup;
  // email
  // password
  // loggonInUser

  constructor(private _formBuilder: FormBuilder,private authent: AthenticationService, private router: Router) { 
    // this.contactForm = this._formBuilder.group({
    //   email: "",
    //   password: ""
    // });
  }

  ngOnInit() {
    // this.authent.getCurrentUser();
  }
  // login(){
  //   console.log(this.contactForm.value.email);
  //   this.authent.signInUser(this.contactForm.value.email, this.contactForm.value.password)
  //   this.loggonInUser = this.authent.userInfo
  //   this.router.navigate(['/product']);
  // }

}
