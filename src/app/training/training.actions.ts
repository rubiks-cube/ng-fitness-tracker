import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';


export const SET_AVAILABLE_TRAININGS = '[Traing] Set Available Trainings' ;
export const SET_FINISHED_TRAININGS = '[Traing] Set Finished Trainings' ;
export const START_TRAINING = '[Traing] Start Training';
export const STOP_TRAINING = '[Traing] Stop Training';

export class  SetAvailableTrainings implements  Action {
 readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class  SetFinishedTrainings implements  Action {
    readonly type = SET_FINISHED_TRAININGS;

     constructor(public payload: Exercise[]) {}
   }

export class  StartTraining implements  Action {
    readonly type = START_TRAINING;

     constructor(public payload: string) {}
   }

export class  StopTraining implements  Action {
    readonly type = STOP_TRAINING;

   }

   export type TrainingActions = StartTraining | StopTraining
    | SetAvailableTrainings | SetFinishedTrainings;
