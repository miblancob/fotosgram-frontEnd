import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PostRequest } from 'src/app/interfaces/post-request.interface';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];

  form: PostRequest = {
    mensaje: '',
    coords: null,
    position: false,
  };

  loadingGeolocation: boolean = false;

  constructor(
    private postsService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  createPost() {
    this.postsService.createPost(this.form).subscribe((response) => {
      this.postsService.emitNewPost(response.post);
      this.form = {
        mensaje: '',
        coords: null,
        position: false,
      };
      this.tempImages = [];
      this.route.navigateByUrl('/main/tabs/tab1');
    });
  }

  getGeolocation() {
    if (!this.form.position) {
      this.form.coords = null;
      return;
    }
    this.loadingGeolocation = true;
    this.geolocation
      .getCurrentPosition()
      .then((response) => {
        this.loadingGeolocation = false;
        const coords = `${response.coords.latitude},${response.coords.longitude}`;
        this.form.coords = coords;
      })
      .catch((error) => {
        this.loadingGeolocation = false;
      });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.getPicture(options);
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.getPicture(options);
  }

  getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        this.postsService.uploadImage(imageData);
        this.tempImages = [...this.tempImages, img];
      },
      (err) => {
        // Handle error
      }
    );
  }
}
