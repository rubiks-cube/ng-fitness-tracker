import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Observable} from 'rxjs/Observable';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {


  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

onStartTraining(form: NgForm) {
  this.trainingService.startExercise(form.value.exercise);
}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
   this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
  this.exerciseSubscription.unsubscribe();
  }

}
