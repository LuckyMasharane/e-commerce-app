import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  cart: any
  product
  uid
  total

  constructor( private saleService : SalesService , private router: Router) {
    // this.router.getCurrentNavigation().extras.state
    // this.product = history.state
  }
  ngOnInit() { 
    this.getAddedCart();
  }
  ionViewDidEnter(){
    this.saleService.getAllCart();
    this.cart = JSON.parse(localStorage.getItem("carts"));
    console.log(this.cart);
    this.getAddedCart();
  }
  
  getAddedCart(){ 
    console.log("added product from firebase == " + this.cart);
  }

  getTotal(){
    this.total = this.cart.reduce((i,j)=> i + j.price * j.quantity,0)
    return this.total;
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  // ViewProduct(product){
  //   this.router.navigateByUrl('/more-info/update', { state: product});
  // }

}
