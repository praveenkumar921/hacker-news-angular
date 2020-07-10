import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  constructor(private http: HttpClient) { }

// To get top stories id's from remote
  public topStories() {
    return this.http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }

// To get stories based on id's from remote
  public getArticlesByID(id: number) {
    return this.http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty');
  }
}
