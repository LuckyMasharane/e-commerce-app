import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  product
  constructor(private prod: ProductService, private router: Router) {
    this.router.getCurrentNavigation().extras.state
    this.product = history.state
  }

  addToCart(product) {
    console.log("add");
    
    this.prod.addProduct(product);
    
  }

  count(){
    this.prod.getCartItemCount()
  }
}
