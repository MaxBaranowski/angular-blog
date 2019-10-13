import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>(); // stream subkect type

  constructor(private http: HttpClient) {}

  logIn(user: UserInterface): Observable<any> {
    user.returnSecureToken = true; // for FireBase for expiresIn field (token lifetime)
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      user
    ).pipe(
      tap(this.setToken),
      catchError(this.errorHandler.bind(this))
    );
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FirebaseAuthInterface | null): void {
    // response is object
    if (response) {
      const {idToken, expiresIn} = response;
      const expDate = (new Date(new Date().getTime() + parseInt(expiresIn) * 1000)).toString(); // current date im ms + expires in ms(*1000)
      // save token in localStorage
      localStorage.setItem('firebase-token', idToken);
      localStorage.setItem('firebase-token-expires', expDate);
    } else {
      localStorage.clear(); // clear all
    }
    console.log(response);
  }

  get token(): string {
    const expDate = localStorage.getItem('firebase-token-expires');
    if (expDate && new Date().getTime() > new Date(expDate).getTime()) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  private errorHandler(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('There is no user with such email');
        break;
      default:
    }
    console.log(error);
    return throwError(error);
  }

}
