import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ViewDidEnter } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.interface';
import { UiService } from 'src/app/services/ui-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewDidEnter {
  @ViewChild('mainSlide') mainSlide: IonSlides;

  loginUser: User = {
    email: 'miguelblancobazaga@gmail.com',
    password: '123456',
  };

  registerUser: User = {
    email: 'test@test.com',
    password: '123456',
    nombre: 'Test',
  };

  constructor(
    private userService: UserService,
    private navController: NavController,
    private uiService: UiService
  ) {}

  ionViewDidEnter() {
    this.mainSlide.lockSwipes(true);
  }

  ngOnInit() {}

  login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    this.userService
      .login(this.loginUser.email, this.loginUser.password)
      .subscribe(async (response) => {
        if (response.ok) {
          this.userService.saveToken(response.token);
          this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
          return;
        }
        await this.userService.saveToken(null);
        this.uiService.presentAlert('El usuario o la contraseña no son correctos');
      });
  }

  register(fRegister: NgForm) {
    if (fRegister.invalid) {
      return;
    }

    const user: User = {
      email: this.registerUser.email,
      nombre: this.registerUser.nombre,
      password: this.registerUser.password,
    };

    this.userService.register(user).subscribe(async (response) => {
      if (response.ok) {
        this.userService.saveToken(response.token);
        this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
        return;
      }
      await this.userService.saveToken(null);
      this.uiService.presentAlert('Los datos introducidos no son correctos');
    });
  }

  showLogin() {
    this.mainSlide.lockSwipes(false);
    this.mainSlide.slideTo(0);
    this.mainSlide.lockSwipes(true);
  }

  showRegister() {
    this.mainSlide.lockSwipes(false);
    this.mainSlide.slideTo(1);
    this.mainSlide.lockSwipes(true);
  }
}
