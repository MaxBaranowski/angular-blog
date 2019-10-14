import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) { }

  create(post: PostInterface): Observable<PostInterface> {
    return this.http.post<PostInterface>(`${environment.FIREBASE_DB_URL}/posts.json`, post);
  }

  getAll(): Observable<PostInterface[]> {
    // firebase returns {{},{},{}}
    // needs [{},{},{}]
    return this.http.get<PostInterface>(`${environment.FIREBASE_DB_URL}/posts.json?print=pretty`)
               .pipe(
                 map((response: { [key: string]: any }) => {
                     return Object.keys(response).map(key => {
                       return {
                         ...response[key],
                         id: key
                       };
                     });
                     // return [];
                   }
                 )
               );
    // author: "max"
    // date: "2019-10-14T09:37:17.963Z"
    // id: "-Lr8cFpodTgfEc5a8WAd"
    // text: "<p>trololo</p>"
    // title: "first post"
  }

  getById(postId: string): Observable<PostInterface> {
    return this.http.get<PostInterface>(`${environment.FIREBASE_DB_URL}/posts/${postId}.json?print=pretty`)
               .pipe(
                 map((response: PostInterface) => {
                     return {
                       ...response,
                       id: postId
                     };
                   }
                 )
               );
  }
}
