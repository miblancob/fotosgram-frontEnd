import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];

  enabledInfiniteScroll = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadData();
    this.postsService.newPost.subscribe((post) => {
      this.posts = [post, ...this.posts];
    });
  }

  doRefresh(event) {
    this.enabledInfiniteScroll = true;
    this.posts = [];
    this.loadData(event, true);
  }

  loadData(event?, pull = false) {
    this.postsService.getPosts(pull).subscribe((response) => {
      this.posts.push(...response.posts);
      if (event) {
        event.target.complete();
        if (response.posts.length === 0) {
          this.enabledInfiniteScroll = false;
        }
      }
    });
  }
}
