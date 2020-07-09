import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './hacker-news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public topStoriesId: any;
  public articlesByID: any;
  public sortScoreAssending = true;
  public sortdateAssending = true;


  constructor(public hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.topStoriesId = JSON.parse(localStorage.getItem('storiesId'));
    this.articlesByID = JSON.parse(localStorage.getItem('articlesByID'));
    this.fetchIds();
    console.log('this.topStoriesId-out', this.topStoriesId);
    console.log('this.articlesByID-out', this.articlesByID);
    
  }
  public fetchIds() {
    if (!this.topStoriesId) {
      this.hackerNewsService.topStories().subscribe((data) => {
        this.topStoriesId = data;
        localStorage.setItem('storiesId', JSON.stringify(this.topStoriesId));
        console.log('initArticles', data);
        this.fetchArticalByIds();
      });
    }
  }
  public fetchArticalByIds() {
    if (!this.articlesByID || this.articlesByID?.length === 0) {
      this.articlesByID = [];
      console.log('this.topStoriesId', this.topStoriesId);
      if (this.topStoriesId) {
        this.topStoriesId.forEach((id) => {
          this.hackerNewsService.getArticlesByID(id).subscribe((data: any) => {
            this.articlesByID.push(data);
            localStorage.setItem('articlesByID', JSON.stringify(this.articlesByID));
          });
        });
      }
    }
  }
  
  public sortByScore() {
    if (this.sortScoreAssending) {
    this.articlesByID.sort((a, b) => (a.score < b.score) ? 1 : -1);
    } else {
      this.articlesByID.sort((a, b) => (a.score > b.score) ? 1 : -1);
    }
    this.sortScoreAssending = !this.sortScoreAssending;
    this.articlesByID = [...this.articlesByID];
  }

  public sortByDate() {
    if (this.sortdateAssending) {
      this.articlesByID.sort((a, b) => (a.time < b.time) ? 1 : -1);
    } else {
      this.articlesByID.sort((a, b) => (a.time > b.time) ? 1 : -1);
    }
    this.sortdateAssending = !this.sortdateAssending;
    this.articlesByID = [...this.articlesByID];
    }

    public filterItem(value) {
      console.log('value', value);
      if (!value) {
        this.assignCopy();
      }
      this.articlesByID = Object.assign([], JSON.parse(localStorage.getItem('articlesByID'))).filter(
        item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }
    public assignCopy() {
      this.articlesByID = Object.assign([], JSON.parse(localStorage.getItem('articlesByID')));
    }
}
