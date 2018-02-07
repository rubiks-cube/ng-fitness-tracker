import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit{
@ Output() closeSidenav = new EventEmitter<void>();
// authSubscription: Subscription;
 isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

onClose() {
this.closeSidenav.emit();
}

onLogout() {
  this.onClose();
  this.authService.logout();
}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
  }
  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }

}
