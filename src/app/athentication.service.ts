import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase';
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

  constructor(public afStore: AngularFirestore, public ngFireAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
    // this.ngFireAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('userID', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('userID'));
    //   } else {
    //     localStorage.setItem('userID', null);
    //     JSON.parse(localStorage.getItem('userID'));
    //   }
    // })
   }

  SignIn(email, password) {
    let user: any;
    let message = "";
    return firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      user = result
      console.log(result);

      if (user) {

        message = user.user.email + " has successfully logged in"
        localStorage.setItem('userID', user.user.uid);
        console.log(localStorage.getItem('userID'));
        console.log(message);
      } else {
        console.log(message);
      }
      return user.user.email
    });
  }


  RegisterUser(user) {
    // let user:any;
    let message = "";
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {

        if (res) {
          console.log(res);
          message = "successfully registered";
          localStorage.setItem('userID', res.user.uid);
          console.log(localStorage.getItem('userID'));
          console.log(message);
          firebase.database().ref('costumers/' + res.user.uid).set({

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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userId = user.uid;
        firebase.database().ref('/customers/' + userId).once('value').then(userProfile => {
          this.userInfo = new User(userProfile.val().firstName, userProfile.val().lastName, userProfile.val().email,userProfile.val().paswword)
          console.log(this.userInfo);
          // return userInfo
        })
      } else {
        console.log("user not logged in");
      }
    });

  }

  // isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('userID'));
  //   return (user !== null) ? true : false;
  // }

  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`costumers/${user.uid}`);
  //   const userData: User = {

  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  PasswordRecover(passwordResetEmail) {
    return firebase.auth().sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }
  SignOut() {
    return firebase.auth().signOut().then(() => {
      localStorage.removeItem('userID');

    })
  }
}
