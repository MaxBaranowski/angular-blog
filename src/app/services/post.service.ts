import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) { }

  create(post: PostInterface): Observable<PostInterface> {
    return this.http.post<PostInterface>(`${environment.FIREBASE_DB_URL}/posts.json`, post);
  }
}
