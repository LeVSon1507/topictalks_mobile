import { observable, action, makeObservable } from 'mobx';
import { IPost } from '../utils';

class PostItemStore {
   posts: IPost[] = [];

   constructor() {
      makeObservable(this, {
         posts: observable,
         setPosts: action,
         updatePost: action,
      });
   }

   setPosts(post) {
      this.posts = post;
   }

   updatePost(postId, updatedPost) {
      const index = this.posts.findIndex(post => post.id === postId);
      if (index !== -1) {
         this.posts[index] = updatedPost;
      }
   }
}

const postItemStore = new PostItemStore();

export default postItemStore;
