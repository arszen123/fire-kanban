import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fire kanban';
  readonly isAuthenticated$: Observable<boolean>;
  readonly isAuthenticatedAnonymously$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
  ) {
    this.isAuthenticated$ = this.auth.user.pipe(map(user => user !== null));
    this.isAuthenticatedAnonymously$ = this.auth.user.pipe(map(user => {
      return user !== null && user.isAnonymous;
    }))
  }

  ngOnInit() {}

  loginAnonymously() {
    this.auth.signInAnonymously();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
