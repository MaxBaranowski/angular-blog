import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  postCreated: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const post: PostInterface = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    // console.log(post)

    this.postService.create(post).pipe(
      tap(data => {
        // console.log(1, data);
        this.showHidePostMessage();
        this.form.reset();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => console.log(res));

  }

  private showHidePostMessage(time = 3500) {
    this.postCreated = true;
    return setTimeout(() => {
      this.postCreated = false;
    }, time);
  }

}
