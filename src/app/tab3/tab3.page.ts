import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  userProfile

  constructor(private authenService: AthenticationService,public router: Router) {}

  ngOnInit(): void {
    this.authenService.getCurrentUser()
    this.userProfile = this.authenService.userInfo;

    console.log(this.userProfile);
    
  }

  logout(){
    console.log("successfully logout");
    this.authenService.SignOut();
    this.router.navigate(['/we']);
  }

}
