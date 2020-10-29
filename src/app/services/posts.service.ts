import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {
  FileUploadOptions,
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { PostRequest } from '../interfaces/post-request.interface';
import { PostResponse } from '../interfaces/post-response.interface';
import { Post } from '../interfaces/post.interface';
import { PostsResponse } from '../interfaces/posts-response.interface';
import { UserService } from './user.service';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  pagePost = 0;
  newPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer
  ) {}

  getPosts(pull = false) {
    if (pull) {
      this.pagePost = 0;
    }
    this.pagePost++;
    return this.http.get<PostsResponse>(`${baseUrl}/posts?page=${this.pagePost}`, {
      headers: { 'x-token': this.userService.token },
    });
  }

  createPost(post: PostRequest) {
    const headers = new HttpHeaders({ 'x-token': this.userService.token });
    return this.http.post<PostResponse>(`${baseUrl}/posts`, post, { headers });
  }

  emitNewPost(post: Post) {
    this.newPost.emit(post);
  }

  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: { 'x-token': this.userService.token },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer
      .upload(img, `${URL}/posts/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
