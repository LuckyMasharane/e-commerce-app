import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SalesService {
 
  cartItem: any;
  cartList:{};
  userID = localStorage.getItem('userID');
  constructor(private db: AngularFirestore ) { }


  getAllCart() {
    this.db.collection('carts', ref => ref.where('userID', '==', this.userID) ).valueChanges().subscribe(val =>{
      this.cartList = val;
      localStorage.setItem("carts",JSON.stringify(this.cartList))
      console.log(this.cartList);
      // return val 
    })
  }

  addToCart(product){
    this.db.collection("carts").add(product).then(results => {
      console.log("added");
    }
    ).catch(err => {
      console.log(err);
    })
  };

}
