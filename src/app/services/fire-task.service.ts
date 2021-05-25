import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TaskService, ListName, Board } from './task.service';
import { Task } from '../components/task/task.interface';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, mergeAll } from 'rxjs/operators';

type BoardFirestoreDocument = AngularFirestoreDocument<Board>;

@Injectable({
  providedIn: 'root'
})
export class FireTaskService extends TaskService {

  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore,
  ) { 
    super();
  }

  private get document$(): Observable<BoardFirestoreDocument> {
    const subject = new Subject<BoardFirestoreDocument>();
    this.auth.user.subscribe(user => {
      if (user !== null) {
        const doc = this.store.collection('boards').doc<Board>(user.uid);
        subject.next(doc);
        subject.complete();
      }
    }, err => subject.error(err));
    return subject;
  }

  getBoard() {
    return this.document$.pipe(map(docRef => docRef.valueChanges()), mergeAll()) as Observable<Board>;
  }

  create(list: ListName, task: Task) {
    this.document$.subscribe(doc => {
      doc.set({
        [list]: [task]
      } as Board, {merge: true});
    });
  }

  update(list: ListName, index: number, task: Task) {
    this.document$.subscribe(docRef => {
      docRef.get().subscribe(doc => {
        const data = doc.data();
        if (data) {
          const listData = data[list];
          listData.splice(index , 1, ...[task]);

          docRef.update({
            [list]: listData,
          });
        }
      })
    });
  }

  move(currentList: ListName, newList: ListName, currentIndex: number, newIndex: number) {
    this.document$.subscribe(docRef => {
      docRef.get().subscribe(doc => {
        const data = doc.data();

        if (data) {
          const currentListData = data[currentList];
          const newListData = data[newList];
          const tasks = currentListData.splice(currentIndex, 1);
          newListData.splice(newIndex, 0, ...tasks);

          docRef.update({
            [currentList]: currentListData,
            [newList]: newListData,
          });
        }
      })
    });
  }
}
