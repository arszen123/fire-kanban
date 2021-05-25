import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from './task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() update = new EventEmitter<Task>();

  constructor(
    private matDialog: MatDialog,
  ) {}

  doEdit() {
    const dialogRef = this.matDialog.open(
      TaskEditComponent,
      {
        data: {
          task: this.task
        }
      }
    );

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.update.emit(data);
      }
    })
  }
}
