import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop.current.training';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

 progess = 0;
 timer;


constructor(public dialog: MatDialog, private trainingService: TrainingService,
        private store: Store<fromTraining.State> ) { }

   onStop() {
      clearInterval(this.timer);
     const dialogRef = this.dialog.open(StopTrainingComponent, {
     data : {progress : this.progess}
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
        this.trainingService.cancelExercise(this.progess);

        } else {
       this.startOrResumeTimer();
      }
      });

    }

    startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {

    const step = ex.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progess += 1;
      if (this.progess >= 100) {
        this.trainingService.completeExercise();
      clearInterval(this.timer); }
       }, step);

     });

    }

     ngOnInit() {
      this.startOrResumeTimer();
     }

}
