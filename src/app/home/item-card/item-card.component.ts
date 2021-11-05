import { AngularFirestore } from '@angular/fire/firestore';
import { NbAuthService } from '@nebular/auth';
import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input('item') item:any;
  user: any;
  quantity:number=0;

  constructor( private cartService:CartService,private auth:NbAuthService,private firestore:AngularFirestore) { }

  ngOnInit(): void {
    this.auth
      .onTokenChange()
      .pipe()
      .subscribe((r: any) => {
        this.user = r.payload;
      });
       console.log
      const cartId=localStorage.getItem('cartId') as string;
         this.firestore.collection("host-card-infos").doc(cartId).collection('items').doc(this.item.id).valueChanges().subscribe((r:any)=>{
           console.log('calufsef',r);
           if(r)
          this.quantity=r.quantity
          else 
          this.quantity=0;

         });

         this.firestore.collection("host-card-infos").doc(cartId).collection('items').doc(this.item.id).valueChanges().subscribe((r:any)=>{
       
          if(r)
         this.quantity=r.quantity
         else 
         this.quantity=0;

        });
  }
  add(item: any) {
    //Update Cart
    console.log(item);
    this.cartService.addToCart(item);
  }

}
