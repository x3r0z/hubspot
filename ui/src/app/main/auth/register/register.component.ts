import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | undefined;
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
    this.registerForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  register(): void {
    if (this.registerForm?.valid) {
      const data = this.registerForm.getRawValue();
      this.globalError = null;
      const body = {
        email: data.email,
        password: data.password,
        name: data.firstName + ' ' + data.lastName
      }
      this._authService.register(body).subscribe(
        () => {
          this._router.navigate(['/auth/login']);
        },
        (error) => {
          this.globalError = error.error.message;
        }
      );
    }
  }

}
