import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postsSubscription: Subscription
  deleteSubscription: Subscription
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe()
    }
    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  }

  remove(id: string) {
    this.deleteSubscription = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger("Post removed")
    })
  }

}
