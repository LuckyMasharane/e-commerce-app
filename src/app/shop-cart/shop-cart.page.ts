import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.page.html',
  styleUrls: ['./shop-cart.page.scss'],
})
export class ShopCartPage implements OnInit {

  product

  constructor(private prod: ProductService, private router: Router) { 
    this.router.getCurrentNavigation().extras.state
    this.product = history.state
  }

  ngOnInit() {
  }
  // addToCart(product) {
  //   this.prod.addProduct(product);
    
  // }
  
  // ViewProduct(product){
  //   this.router.navigateByUrl('/more-info/update', { state: product});
  // }

}
