import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: PostInterface[];
  PS: Subscription;

  // post service subscribe

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.PS = this.postsService.getAll().subscribe(res => {this.posts = res;});
  }

  ngOnDestroy(): void {
    this.PS.unsubscribe();
  }

}
