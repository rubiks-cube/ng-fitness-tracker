import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
// import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {


  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
 // private exerciseSubscription: Subscription;
 // private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService,
     private uiSerice: UIService,
    private store: Store<fromTraining.State>) { }

onStartTraining(form: NgForm) {
  this.trainingService.startExercise(form.value.exercise);
}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
    // this.loadingSubs = this.uiSerice.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    //   this.exercises = exercises;
    // });

  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  // this.exerciseSubscription.unsubscribe();
  //   }
  //   if (this.loadingSubs) {
  // this.loadingSubs.unsubscribe();
  //   }
  // }

}
