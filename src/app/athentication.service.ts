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
  userInfo: any

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  SignIn(email, password) {
    return firebase.default.auth().signInWithEmailAndPassword(email, password)
  }


  RegisterUser(email, password) {
    return firebase.default.auth().createUserWithEmailAndPassword(email, password)
  }

  getCurrentUser() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid;
        firebase.default.database().ref('/consumers/' + userId).once('value').then(userProfile => {
          this.userInfo = new User(userProfile.val().firstName, userProfile.val().lastName, userProfile.val().email)
          console.log("userInfo===" , this.userInfo.email);
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
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
