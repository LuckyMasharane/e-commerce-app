import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  prod_List: Product[] = []

  constructor(private prod: ProductService, private router: Router) { }

  ngOnInit() {
    this.getproductLists();
  }

  getproductLists() {
    return this.prod.getAllProduct().subscribe(res => {
      this.prod_List = res.map(product => {
        return {
          ...product.payload.doc.data(),
          id:product.payload.doc.id
        } as Product
      })
    })
  }

  shoppingCart(){
    this.router.navigate(['/shop-cart'])
  }
  ViewProduct(product) {
    this.router.navigateByUrl('/shop-cart', { state: product });
  }
}
