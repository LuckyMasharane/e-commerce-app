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
  cartList:any
  constructor(private prod: ProductService, private saleService : SalesService , private router: Router, private db: AngularFirestore) {
    this.router.getCurrentNavigation().extras.state
    this.product = history.state
  }
  ngOnInit() { 
    this.getAddedCart();
  }
  

  getAddedCart(){
    this.cartList = this.saleService.getAllCart()
    console.log(this.cartList);
    
  }

  getTotal(){
    return this.cart.reduce((i,j)=> i + j.price * j.amout,0)
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
}
