import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
// import {Subject} from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import { error } from 'selenium-webdriver';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';





@Injectable()
export class AuthService {
  //  authChange = new Subject<boolean>();
   // private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
    private uiService: UIService,
     private store: Store<fromRoot.State>) {}



    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
           if (user) {
               this.store.dispatch(new Auth.SetAuthenticated());

            // this.authChange.next(true);
            this.router.navigate(['/training']);
           // this.isAuthenticated = true;
           } else {
               this.store.dispatch(new Auth.SetUnauthenticated());
            this.trainingService.cancelSubscriptions();
            // this.isAuthenticated = false;
           // this.authChange.next(false);
            this.router.navigate(['/login']);
           }
        });
        }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());

        })
        .catch(err => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(err.message, null, 3000);
        });

    }

    login(authData: AuthData) {
       //  this.uiService.loadingStateChanged.next(true);
       this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        })
        .catch(err => {
          //  this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(err.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }


    // isAuth() {
    //     return this.isAuthenticated;
    // }

}
