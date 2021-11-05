import { CartService } from './../services/cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { NbMenuService, NB_WINDOW } from '@nebular/theme';
import { Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { HostCartInfo } from '../model/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  cart:any={
    quantity:0
  };
  items = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(
    private nbMenuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(NB_WINDOW) private window: any,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((r: any) => {
        this.user = r.payload;
        const cartId = localStorage.getItem('cartId');
       
        if (!cartId) {
          // create cart

           this.cartService.create(r.payload.email).then(r=>r);

          // create Cart
    

          
        } else {
          // get Cart
          console.log('cart found')
          const data$ =this.cartService.get()
          .subscribe(
            (res:any) => {
              console.log("hommee",res.payload.id)
              if(res.payload.data())
              this.cart= { id: res.payload.id, ...res.payload.data() };
              else 
              this.cart =  {
                quantity:0
              }
            },
            err => {
              console.debug(err);
            }
          )
         
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut() {
    this.authService.logout('google').subscribe((r) => console.log(r));
  }

  reDirect() {
    window.location.href = "/";
  }
}
