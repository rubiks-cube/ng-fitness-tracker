import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Exercise} from '../exercise.model';
import { TrainingService } from '../training.service';
// import { Subscription } from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
// private exChangedSubscription: Subscription;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService,
       private store: Store<fromTraining.State>) { }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercisess)
    .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // ngOnDestroy() {
  //   if (this.exChangedSubscription) {
  //   this.exChangedSubscription.unsubscribe();
  //   }
  // }

}
