import { NbAuthService } from '@nebular/auth';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppin-cart',
  templateUrl: './shoppin-cart.component.html',
  styleUrls: ['./shoppin-cart.component.scss']
})
export class ShoppinCartComponent implements OnInit {
  cart:any
  cartItems:[]=[]
  constructor(private cartservice:CartService,private auth:NbAuthService) { }

  ngOnInit(): void {

    this.cartservice.get().subscribe(
      (res:any) => {
        console.log("shopping",res.type)
        if(res.type==='removed') {
          this.cartItems=[]
        }
        this.cart= { id: res.payload.id, ...res.payload.data() };
      },
      err => {
        console.debug(err);
      }
    )
    this.cartservice.getCartItems().subscribe(r=>this.cartItems=r);
   

  }

  async clearCart() { 
     this.auth.onTokenChange().subscribe( (r)=>{
     
     this.cartservice.clearCart(r.getPayload().email);
    
    });

  
  
    

  }

}
