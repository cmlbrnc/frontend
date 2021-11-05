import { CartService } from './../../services/cart.service';
import { ItemsService } from './../../services/items.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  items = [];
  added: boolean = false;
  user: any;
  cart: any = {
    items: [],
  };
  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemsService.getItemList().subscribe((r: any) => (this.items = r));
   
  }

}
