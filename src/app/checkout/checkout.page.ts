import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthenticationService } from '../athentication.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  user
  cart
  total
  constructor(private saleService : SalesService , private authenService: AthenticationService,public router: Router) { }

  ngOnInit() {
    this.user = this.authenService.userInfo;
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

}
