

import { CanActivate, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoginGuards implements CanActivate{

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()){
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }
}
