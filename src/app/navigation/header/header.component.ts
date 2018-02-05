import { Component, OnInit , EventEmitter, Output, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 @Output() sideNavToggle = new EventEmitter<void>();
 authSubscription: Subscription;
 isAuth: boolean;
  constructor(private authService: AuthService) { }

  onToggleSidenav() {
 this.sideNavToggle.emit();
  }

  onLogout() {
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
