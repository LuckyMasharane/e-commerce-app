import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  prod_List: Product[] = []

  constructor(private prod: ProductService,) { }

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

}
