import { Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, share, take } from 'rxjs/operators';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';


import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'custom-auth-login',
  templateUrl: './custom-auth-login.component.html',
  styleUrls: ['./custom-auth-login.scss'],
})
export class CustomAuthLoginComponent {
  private destroy$: Subject<void> = new Subject<void>();
  userToken$: Observable<NbAuthToken>;
  isAuthenticated$: Observable<boolean>;


  constructor(
  
    private authService: NbAuthService,
    private router: Router,
    private auth:AngularFireAuth,
    private route: ActivatedRoute,
  ) {
    this.userToken$ = this.authService.onTokenChange();
    this.isAuthenticated$ = this.authService.onAuthenticationChange();
  }

  logout() {
    this.authService.logout('google')
      .pipe()
      .subscribe((authResult: NbAuthResult) => {});

  }

  loginWithGoogle() {
    this.authService.authenticate('google')
      .pipe()
      .subscribe((authResult: NbAuthResult) => {
        console.log(authResult);

        window.location.href = "/";
      });
  }

 

 

}
