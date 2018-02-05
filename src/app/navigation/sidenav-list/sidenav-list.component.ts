import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
@ Output() closeSidenav = new EventEmitter<void>();
authSubscription: Subscription;
 isAuth: boolean;
  constructor(private authService: AuthService) { }

onClose() {
this.closeSidenav.emit();
}

onLogout() {
  this.onClose();
  this.authService.logout();
}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
