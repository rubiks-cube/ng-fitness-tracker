import { Component, OnInit} from '@angular/core';
// import {Subscription} from 'rxjs/Subscription';
import { TrainingService } from './training.service';
import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$: Observable<boolean>;
  // exerciseSubscription: Subscription;



  constructor(private trainingService: TrainingService,
   private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   if (exercise) {
    //     console.log(exercise);
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
    // });
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //   this.exerciseSubscription.unsubscribe();
  //   }
  // }

}
