import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { SalesService } from '../sales.service';
import { AthenticationService } from '../athentication.service';


@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.page.html',
  styleUrls: ['./shop-cart.page.scss'],
})
export class ShopCartPage implements OnInit {

  product
  userId

  constructor(private prod: ProductService, private auth:AthenticationService, private router: Router, private salesService: SalesService) { 
    this.router.getCurrentNavigation().extras.state
    this.product = history.state
  }

  ngOnInit() {
    this.userId = this.auth.getCurrentUser()
    console.log(this.userId);
    
  }

 addToCart(){
   this.salesService.addToCart(this.userId ,this.product)
 }
  
  ViewProduct(product){
    this.router.navigateByUrl('/more-info/update', { state: product});
  }

}
