import { Injectable } from '@angular/core';
// import {Subject} from 'rxjs/Subject';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';


@Injectable()

export class TrainingService {
  // exerciseChanged = new Subject<Exercise>();
  // exercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();
  //   private availableExercises: Exercise[] = [];

  //   private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];


    constructor( private db: AngularFirestore,
         private uiService: UIService,
        private store: Store<fromTraining.State>) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
      // this.uiService.loadingStateChanged.next(true);
      this.fbSubs.push( this.db.collection('availableExercises').snapshotChanges()
    .map(doArray => {
     return doArray.map(doc => {
       return {
         id: doc.payload.doc.id,
         name: doc.payload.doc.data().name,
         duration: doc.payload.doc.data().duration,
         calories: doc.payload.doc.data().calories
       };

     });
   }).subscribe((exercises: Exercise[]) => {
    this.store.dispatch(new UI.StopLoading());
     this.store.dispatch(new Training.SetAvailableTrainings(exercises));
   // this.uiService.loadingStateChanged.next(false);
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
   }, error => {
    this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Fetching Exercises failed.Please try again later', null, 3000);
       // this.exercisesChanged.next(null);
   }));
    }

    startExercise(selectId: string) {
      this.store.dispatch(new Training.StartTraining(selectId));
        // this.runningExercise = this.availableExercises.find(ex => ex.id === selectId);
        // this.exerciseChanged.next({...this.runningExercise});
    }

    // getRunningExercise() {
    //     return {...this.runningExercise};
    // }

    completeExercise() {
      this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
        this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
        this.store.dispatch(new Training.StopTraining());
      });

      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
      this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
        this.addDataToDatabase({...ex,
            duration: ex.duration * (progress / 100),
            calories: ex.calories * (progress / 100),
            date: new Date(), state: 'cancelled'});
            this.store.dispatch(new Training.StopTraining());
        });
        // this.runningExercise = null;
        // this.exerciseChanged.next(null);

    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[]) => {
                // this.finishedExercisesChanged.next(exercises);
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));
    }

    private addDataToDatabase(exercise: Exercise) {
          this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions() {
     this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}
