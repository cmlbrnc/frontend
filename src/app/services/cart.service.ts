import { ItemsService } from './items.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HostCartInfo, Item } from '../model/models';
import { map, take } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class CartService {
  
  constructor(private firestore: AngularFirestore,private itemService:ItemsService) { }
  

  create(userEmail:string) {
    const cart: HostCartInfo = {
      userId: userEmail,
      items: [],
      total: 0,
    }; 
    return this.firestore
    .collection('host-card-infos')
    .add(cart)
    .then((snap:any) => {
      console.log(snap.id)
     localStorage.setItem('cartId',snap.id);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  get() {
   
    return  this.firestore
    .collection('host-card-infos').doc(this.getCartId()).snapshotChanges();
  }
  

  async addToCart(item:any) { 
    this.updateCartItem(item, 1);
  }

  async removeFromCart(item:any) {
    this.updateCartItem(item, -1);
  }
 

   async clearCart(email:any) { 
    console.log('clear cart',this.getCartId(),email)
     await this.firestore.collection('host-card-infos').doc(this.getCartId()).delete().then(r=>localStorage.setItem('cartId',''))
      console.log('delete')
     this.create(email)
     console.log('create')

  }
  

   
  

  

  

  private async updateCartItem(item: any, change: number) {
    
    // get cart item 
   const cartItem:any = await this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').doc(item.id).get().toPromise().then(r=> r.data())
   console.log(cartItem);
   if(cartItem) {
    if(cartItem.quantity===1 && change<0) {
      console.log('delete');
       await this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').doc(item.id).delete();
       this.updateCart()
      return;
    } else  {
     await this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').doc(item.id).set({
       quantity:cartItem.quantity+change,
       price:parseInt(item.price),
       name:item.name
     })
     this.updateCart()
     return;
    }

   }else {
    await this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').doc(item.id).set({
      quantity:1,
      price:parseInt(item.price),
      name:item.name
    })
    this.updateCart()
     return;

   }
  
  
  }

  getCartItem (itemId:string) {
    return this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').doc(itemId).snapshotChanges()
   
  }
  getCartItems () {
    return this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').snapshotChanges()
    .pipe(
      map((snaps:any) =>
        snaps.map((snap: any) => {
          console.log(snap.payload.doc.id);
          console.log(snap.payload.doc.data());
          return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data(),
          };
        })
      )
    );
   
  }

  private async updateCart() {
    const cartItems:[] = await this.firestore.collection("host-card-infos").doc(this.getCartId()).collection('items').snapshotChanges()
    .pipe(
      map((snaps:any) =>
        snaps.map((snap: any) => {
          console.log(snap.payload.doc.id);
          console.log(snap.payload.doc.data());
          return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data(),
          };
        })
      ),
      take(1)
    ).toPromise().then(r=>r);
  
    const sum = cartItems.reduce((partial_sum, a:any) => partial_sum + (a.quantity*a.price), 0);
    const totalquantity = cartItems.reduce((partial_sum, a:any) => partial_sum + (a.quantity), 0);
  
    this.firestore.collection("host-card-infos").doc(this.getCartId()).update({
      total:sum,
      quantity:totalquantity
    })
  }

  private getCartId() {
    return localStorage.getItem('cartId') as string;
  }

  

}
