import { Component } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  email: string | undefined;
  password: string | undefined;

  validate = false;

  login(): void {
    this.auth.login(this.email, this.password).subscribe((response : any) => {
      if (response.data != null ){
        this.auth.setToken(response.data.access_token);
        this.router.navigate(['/']);
        this.validate = false;
      }
      else {
        this.validate = true;
      }
    });
  }

}
