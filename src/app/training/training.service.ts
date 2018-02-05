import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';


@Injectable()

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];

    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];


    constructor( private db: AngularFirestore) {}

    fetchAvailableExercises() {
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
   }));
    }

    startExercise(selectId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExercise() {
      this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(), state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
        }));
    }

    private addDataToDatabase(exercise: Exercise) {
          this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions() {
     this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}
