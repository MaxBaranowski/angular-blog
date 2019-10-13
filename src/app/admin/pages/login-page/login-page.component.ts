import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  formSubmitted: boolean;

  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(128)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const user: UserInterface = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.formSubmitted = true;
    // console.log(user);

    this.auth.logIn(user)
      .pipe(
        catchError(err => {
          this.formSubmitted = false;
          return throwError(err);
        })
      ).subscribe(res => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
    });

  }

}
