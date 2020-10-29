import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { GetUserResponse } from '../interfaces/get-user-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { User } from '../interfaces/user.interface';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = null;
  private user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
  ) {}

  getUser(): User {
    if (!this.user._id) {
      this.checkToken();
    }
    return { ...this.user };
  }

  login(email: string, password: string) {
    const params = { email, password };
    return this.http.post<LoginResponse>(`${URL}/users/login`, params);
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', { animated: true });
  }

  register(user: User) {
    return this.http.post<RegisterResponse>(`${URL}/users`, user);
  }

  async saveToken(token: string) {
    if (token) {
      this.token = token;
      await this.storage.set('token', token);
      await this.checkToken();
      return;
    }
    this.token = null;
    this.storage.clear();
  }

  async loadToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async checkToken(): Promise<boolean> {
    await this.loadToken();
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    const headers = new HttpHeaders({
      'x-token': this.token,
    });
    return new Promise<boolean>((resolve) => {
      this.http
        .get<GetUserResponse>(`${URL}/users`, { headers })
        .subscribe((response) => {
          if (response.ok) {
            this.user = response.user;
            resolve(true);
            return;
          }
          this.navController.navigateRoot('/login');
          resolve(false);
        });
    });
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({ 'x-token': this.token });

    return this.http.put<LoginResponse>(`${URL}/users`, user, { headers });
  }
}
