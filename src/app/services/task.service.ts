import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../components/task/task.interface';

export type ListName = 'todo' | 'inProgress' | 'done';

type TaskList = Task[];

export type Board = {
  todo: TaskList,
  inProgress: TaskList,
  done: TaskList,
}

@Injectable({
  providedIn: 'root'
})
export abstract class TaskService {
  /**
   * Returns the board.
   */
  abstract getBoard(): Observable<Board>;

  /**
   * Create a new Task in the given list.
   */
  abstract create(list: ListName, task: Task): void;
  /**
   * Update a Task in the given list.
   */
  abstract update(list: ListName, index: number, task: Task): void;
  /**
   * Move a Task from a given list and position to an other list and position.
   */
  abstract move(currentList: ListName, newList: ListName, currentIndex: number, newIndex: number): void;
}
