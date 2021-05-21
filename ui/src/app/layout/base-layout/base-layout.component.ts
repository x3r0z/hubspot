import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../main/shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.sass']
})
export class BaseLayoutComponent implements OnInit {

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
