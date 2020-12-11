import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.page.html',
  styleUrls: ['./shop-cart.page.scss'],
})
export class ShopCartPage implements OnInit {

  product
  // userId
  cart:any;

  constructor( private router: Router, private salesService: SalesService) { 
    this.router.getCurrentNavigation().extras.state
    this.product = history.state
  }

  ngOnInit() {

  }

//  addToCart(){
//    this.salesService.addToCart(this.product)
//  }

 addToCart(product) {
  // console.log(product);
  let userId = localStorage.getItem('userID')
  this.cart = {
    userID: userId,
    quantity: 1,
    product
  }
  // console.log(this.cart);

  this.salesService.addToCart(this.cart)

}
  
  ViewProduct(product){
    this.router.navigateByUrl('/more-info/update', { state: product});
  }

}
