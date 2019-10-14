import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  private postId: string;
  post$: Observable<PostInterface>;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.post$ = this.route.params.pipe((params: Params) => {
    //     return this.postService.getById(params.postId).subscribe(r => r)
    //   }
    // )

    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {// SwitchAll cancels the previous subscription and subscribes to the new one (from params to pstservice)
        return this.postService.getById(params.id);
      })
    );
  }

}
