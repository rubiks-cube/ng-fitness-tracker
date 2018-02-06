import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Observable} from 'rxjs/Observable';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {


  exercises: Exercise[];
  isLoading = true;
 private exerciseSubscription: Subscription;
 private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, private uiSerice: UIService) { }

onStartTraining(form: NgForm) {
  this.trainingService.startExercise(form.value.exercise);
}

  ngOnInit() {
    this.loadingSubs = this.uiSerice.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
  this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
  this.loadingSubs.unsubscribe();
    }
  }

}
