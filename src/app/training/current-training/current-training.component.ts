import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop.current.training';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
 progess = 0;
 timer;
 

  constructor(public dialog: MatDialog) { }

  onStop() {
    clearInterval(this.timer);
   const dialogRef = this.dialog.open(StopTrainingComponent, {
    data : {progress : this.progess}
  });
  dialogRef.afterClosed().subscribe(result => {
   if (result) {
   this.trainingExit.emit();

  } else {
    this.startOrResumeTimer();
  }
  });

  }
  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progess += 5;
      if (this.progess >= 100) {
      clearInterval(this.timer); }
       }, 1000);
  }

  ngOnInit() {
  this.startOrResumeTimer();
  }

}
