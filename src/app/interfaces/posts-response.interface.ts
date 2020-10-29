import { Post } from './post.interface';

export interface PostsResponse {
  ok: boolean;
  page: number;
  posts: Post[];
}
