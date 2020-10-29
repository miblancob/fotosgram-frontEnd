import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagePipe } from './image.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, ImageSanitizerPipe, ImagePipe],
  exports: [DomSanitizerPipe, ImageSanitizerPipe, ImagePipe],
})
export class PipesModule {}
