import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SalesService {
   
  uid: any;
  cartItem: any;

  constructor(private db: AngularFirestore ) { }


  getAllCart() {
    this.cartItem = this.db.collection("carts").snapshotChanges();
    return this.cartItem;
  }

  addToCart(uid: string, item: any){
    this.db.collection(`/carts/`).doc(`${uid}`).set({
      name: item.name, 
      price: item.price,
      description:item.description,
      picture: item.picture, 
      count: 1
    });
  
  };

}
