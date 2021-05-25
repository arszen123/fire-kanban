import { Component, OnDestroy, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from '../task/task.interface';
import { Board, TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  readonly board$: Observable<Board> | null = null;

  constructor(
    private taskService: TaskService,
    private matDialog: MatDialog,
  ) {
    this.board$ = this.taskService.getBoard();
  }

  createTask() {
    const dialogRef = this.matDialog.open(
      TaskEditComponent,
      {
        data: {
          task: {},
          isNew: true,
        }
      }
    );

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.create('todo', data);
      }
    });
  }

  drop(list: any, event: CdkDragDrop<Observable<Task[]>> | CdkDragDrop<Task[]>) {
    const prevList = event.previousContainer.id.replace('cdk-drop-list-', '');
    this.taskService.move(prevList as any, list, event.previousIndex, event.currentIndex);
  }

  updateTask(list: any, index: number, task: Task) {
    this.taskService.update(list, index, task);
  }
}
