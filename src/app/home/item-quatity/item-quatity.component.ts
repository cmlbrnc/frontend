import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-quatity',
  templateUrl: './item-quatity.component.html',
  styleUrls: ['./item-quatity.component.scss']
})
export class ItemQuatityComponent implements OnInit {
  @Input('quantity') quantity:any;
  @Input('item') item:any;
  constructor(private cartService:CartService,) { }

  ngOnInit(): void {
    
    
  }
  addToCart() {
   
    this.cartService.addToCart(this.item);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item);
  }

}
