import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
// import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  isLoading$: Observable<boolean>;
 // private loadingSubs: Subscription;
  constructor(private authService: AuthService,
     private uiService: UIService,
     private store: Store<fromRoot.State>) { }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnInit() {
       this.isLoading$ = this.store.select (fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //   this.loadingSubs.unsubscribe();
  //   }
  // }

}
