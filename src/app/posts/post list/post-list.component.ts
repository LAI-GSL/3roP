import { Component, OnInit, OnDestroy, } from "@angular/core";
import {Post} from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  {

  posts: Post [] = [];
    private postsSub!: Subscription;

    constructor(public postsService: PostService){}

    ngOnInit() {
        this.postsService.getPosts();
      this.postsSub =  this.postsService.getPostsUpdateListener()
        .subscribe((posts:Post[])=>{
            this.posts = posts
        })
    }
    ngOnDestroy() {
      this.postsSub.unsubscribe();
  }

    onDelete(postId: string | undefined) {
      if(postId){
        this.postsService.deletePost(postId)
      }
      
  }

}
