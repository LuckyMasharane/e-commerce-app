import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs';
// import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = []
  private cartItemCount = new BehaviorSubject(0);

  constructor(private db: AngularFirestore) { }

  // productLists: Product[] = [
  //   { picture: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", description: "Black round-neck tee with embroidery pocket detail 100% Cotton", price: "145.00", name: "T-shirt" },
  //   { picture: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", description: "Soft jersey, crewneck tee. Graphic at chest", price: "499.00", name: "Jeans" },
  //   { picture: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", description: "TEAM ROYAL BLUE / FTWR WHITE / SIGNAL GREEN (FU8320)", price: "1120", name: "Adidas sneakers" },
  //   { picture: "https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80", description: "Originally designed for performance hoops, Nike Air cushioning adds lightweight", price: "899", name: "Nike" },
  //   { picture: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1226&q=80", description: "Soft jersey, crewneck tee. Graphic at chest", price: "699", name: "Levis" },
  //   { picture: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "Padded Touch-Fastening Interior Dividers", price: "399", name: "Vinta bag" },
  //   { picture: "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80", description: "Grey, Blue, Red, Brown, Pink, Green, Black", price: "599", name: "Pink leather handbag" },
  //   { picture: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "Offering Women Denim Shorts, Ladies Denim Short", price: "169", name: "Short Jean" },
  //   { picture: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80", description: "The Chuck Taylor All Star Classic celebrates the iconic high top silhouette ", price: "799", name: "All star" }

  // ]

  // local
  // getAllProduct() {
  //   return this.productLists;
  // }

  //local
  // updateProduct(pro: Product) {
  //   const index = this.productLists.findIndex(c => c.id === pro.id);
  //   if (index > -1) {
  //     this.productLists[index] = pro;
  //   }
  // }
  // //local
  // deleteProduct(id: number) {
  //   const pro = this.productLists.findIndex(c => c.id == id);
  //   if (pro > -1) {
  //     this.productLists.splice(pro, 1);
  //   }
  // }

  // local

  // addProduct(prod: Product) {
  //   this.productLists.push({
  //     id: this.productLists.length + 1,
  //     name: prod.name,
  //     price: prod.price,
  //     description: prod.description,
  //     picture: prod.picture,

  //   });
  // }


  // firebase

  getAllProduct() {
    return this.db.collection("product").snapshotChanges()
  }

  getCartItemCount() {
    return this.cartItemCount;
  }


  // addToCart(uid: string, item: any): void {
  //   let obj = this.db.collection(`/product/${uid}/${item.name}`);
  //   obj.ref.onSnapshot(val => {
  //     if (val == null) {
  //       return {
  //         name: item.name, 
  //         price: item.price, 
  //         description: item.description, 
  //         count: 1
  //       };
  //     }
  //     else {
  //       return { 
  //         name: item.name, 
  //         price: item.price, 
  //         description: item.description, 
  //         //count: val.count + 1 
  //       };
  //     }
  //   });
  // };

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.price += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.price = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  // getUid(): Promise<string> {
  //   return this.storage.get('UID').then((value) => {
  //     return value;
  //   });
  // };
  // getItemsFromCart(): any {
  //   this.getUid().then(uid => {
  //     return this.db.collection('/product' + '/' + uid);
  //   });
  // };
  // firebase

  // addProduct(prod: Product) {
  //   let Id = Math.floor(Math.random() * 50);
  //   this.db.collection("product").doc(Id.toString()).set({
  //     // id: this.productLists.length + 1,
  //     name: prod.name,
  //     price: prod.price,
  //     description: prod.description,
  //     picture: prod.picture,

  //   })
  //     .then(function () {
  //       console.log("Document successfully written!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error writing document: ", error);
  //     });
  // }


  // firebase

  // updateProduct(prod:Product){

  //   this.db.doc('product/' + prod).update(prod);

  // }

  // firebase
  // deleteProduct(id: number){
  //   this.db.doc('product/' + id).delete()
  // }

}
