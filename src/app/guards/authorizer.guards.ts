

import { CanActivate, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthorizerGuards implements CanActivate{

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
