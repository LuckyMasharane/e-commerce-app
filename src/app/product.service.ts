import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs';
// import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartItem:any
  cart = []

  private cartItemCount = new BehaviorSubject(0);

  constructor(private db: AngularFirestore) { }

  getAllProduct() {
    this.cartItem = this.db.collection("product").snapshotChanges();
    return this.cartItem;
  }



}
