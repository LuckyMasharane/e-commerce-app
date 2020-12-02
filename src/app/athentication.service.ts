import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AthenticationService {

  userData: any;
  userInfo: User;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
   
  }


  SignIn(email, password) {
    let user:any;
    let message ="";
    return firebase.default.auth().signInWithEmailAndPassword(email, password).then(result =>{
      user = result
      console.log(result);

      if(user){
        
        message = user.user.email + " has successfully logged in"
        localStorage.setItem('userID', user.user.uid);
        console.log(localStorage.getItem('userID'));
        console.log(message);
      }else{
        console.log(message);
      }
      
      return user.user.email
    });
  }


  RegisterUser(user) {
    // let user:any;
    let message="";
    return firebase.default.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {

      if (res) {
        console.log(res);
        message = "successfully registered";
        localStorage.setItem('userID', res.user.uid);
        console.log(localStorage.getItem('userID'));
        console.log(message);
        firebase.default.database().ref('costumers/' + res.user.uid).set({
    
          firstName: user.firstName,
          email: user.email,
          lastName: user.lastName,
          password: user.password
        });
        console.log(message);
    
      } else {
    
      }
      
    }, err => {
      message = err.message;
      console.log(message)
    })
  }

  getCurrentUser() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid;
        firebase.default.database().ref('/consumers/' + userId).once('value').then(userProfile => {
          this.userInfo = new User(userProfile.val().firstName, userProfile.val().lastName, userProfile.val().email)
          console.log("userInfo ===" , this.userInfo.email);
           return this.userInfo
        })
      } else {
        console.log("user not logged in");

      }
    });
  }


  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {

      email: user.email,
      firstName: user.firstName,
      password: user.password,
      lastName: user.lastName
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  PasswordRecover(passwordResetEmail) {
    return firebase.default.auth().sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  SignOut() {
    return firebase.default.auth().signOut().then(() => {
      localStorage.removeItem('userID');
      this.router.navigate(['login']);
    })
  }
}
