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
    // To validate local storage data weather empty or not and store data from local storage.
    this.topStoriesId = JSON.parse(localStorage.getItem('storiesId'));
    this.articlesByID = JSON.parse(localStorage.getItem('articlesByID'));
    this.fetchIds();
  }

// To fetch id's from remote with top stores api and store the data in local storage.
  public fetchIds(): void {
    if (!this.topStoriesId) {
      this.hackerNewsService.topStories().subscribe((data: any) => {
        this.topStoriesId = data;
        localStorage.setItem('storiesId', JSON.stringify(this.topStoriesId));
        this.fetchArticalByIds();
      });
    }
  }

// To fetch articales bases on id's fetched from top stores api and store data to local storage.
  public fetchArticalByIds(): void {
    if (!this.articlesByID || this.articlesByID?.length === 0) {
      this.articlesByID = [];
      if (this.topStoriesId) {
        this.topStoriesId.forEach((id) => {
          this.hackerNewsService.getArticlesByID(id).subscribe((data: any) => {
            this.articlesByID.push(data);
            localStorage.setItem('articlesByID', JSON.stringify(this.articlesByID));
            this.articlesByID = [...this.articlesByID];
          });
        });
      }
    }
  }

// To sort the data based on score in ascending and descending order.
  public sortByScore(): void {
    if (this.sortScoreAssending) {
      this.articlesByID.sort((a, b) => (a.score < b.score) ? 1 : -1);
    } else {
      this.articlesByID.sort((a, b) => (a.score > b.score) ? 1 : -1);
    }
    this.sortScoreAssending = !this.sortScoreAssending;
    this.articlesByID = [...this.articlesByID];
  }

// To sort the data based on date and time in ascending and descending order.
  public sortByDate(): void {
    if (this.sortdateAssending) {
      this.articlesByID.sort((a, b) => (a.time < b.time) ? 1 : -1);
    } else {
      this.articlesByID.sort((a, b) => (a.time > b.time) ? 1 : -1);
    }
    this.sortdateAssending = !this.sortdateAssending;
    this.articlesByID = [...this.articlesByID];
  }

// To filter data based on user search.
  public filterItem(value): void {
    if (!value) {
      this.assignCopy();
    }
    this.articlesByID = Object.assign([], JSON.parse(localStorage.getItem('articlesByID'))).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

// assign the origanl data if nothing is searched.
  public assignCopy(): void {
    this.articlesByID = Object.assign([], JSON.parse(localStorage.getItem('articlesByID')));
  }
}
