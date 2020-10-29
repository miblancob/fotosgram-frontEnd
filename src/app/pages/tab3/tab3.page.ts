import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UiService } from 'src/app/services/ui-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: User = {};

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.postsService.pagePost = 0;
  }

  updateUser(fUpdate: NgForm) {
    if (fUpdate.invalid) {
      return;
    }
    this.userService.updateUser(this.user).subscribe((response) => {
      if (response.ok) {
        this.userService.saveToken(response.token).then(
          () => {
            this.uiService.presentToast('La información se ha actualizado correctamente');
          },
          () => {
            this.uiService.presentToast('Ha ocurrido un error al actualizar');
          }
        );
      }
    });
  }
}
