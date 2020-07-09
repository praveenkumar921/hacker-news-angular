import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  constructor(private http: HttpClient) { }

  topStories() {
    return this.http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }
  // https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
  getArticlesByID(id: number) {
    return this.http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty');
  }
}
