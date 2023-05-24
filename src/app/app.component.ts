import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";
@Component({
  selector: 'bs-root',
  templateUrl: 'app.component.html',
  styles: [`
    .higher-menu {
      margin-top: 20px;
      margin-bottom: 40px;
    }

    .higher-menu .item {
      font-size: 14px;
    }
  `]
})
export class AppComponent {
  constructor(private authService: AuthenticationService) { }
  isLoggedIn() {
    //return true;
    return this.authService.isLoggedIn();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }
}
