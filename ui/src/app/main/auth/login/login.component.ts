import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  showPassword = false;
  passwordType = 'password';
  globalError = null;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  login(): void {
    if(this.loginForm?.valid) {
      const data = this.loginForm.getRawValue();
      this.globalError = null;
      this._authService.login(data.username, data.password).subscribe(
        (response) => {
          this._authService.setItem('accessToken', response.accessToken);
          this._router.navigate(['/invoice/list']);
        },
      (error) => {
          this.globalError = error.error.message;
        }
      )
    }
  }
}
