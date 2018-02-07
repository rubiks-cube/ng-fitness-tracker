import { Component, OnInit , EventEmitter, Output} from '@angular/core';
// import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 @Output() sideNavToggle = new EventEmitter<void>();
 // authSubscription: Subscription;
 isAuth$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  onToggleSidenav() {
 this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  //  this.authSubscription = this.authService.authChange.subscribe(authStatus => {
  //     this.isAuth = authStatus;
  //   });
  }
  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

}
