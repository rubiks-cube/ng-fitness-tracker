import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {AngularFireAuth} from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import { error } from 'selenium-webdriver';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';




@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
    private uiService: UIService) {}



    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
           if (user) {
            this.authChange.next(true);
            this.router.navigate(['/training']);
            this.isAuthenticated = true;
           } else {
            this.trainingService.cancelSubscriptions();
            this.isAuthenticated = false;
            this.authChange.next(false);
            this.router.navigate(['/login']);
           }
        });
        }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);

        })
        .catch(err => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(err.message, null, 3000);
        });

    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch(err => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(err.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }


    isAuth() {
        return this.isAuthenticated;
    }

}
