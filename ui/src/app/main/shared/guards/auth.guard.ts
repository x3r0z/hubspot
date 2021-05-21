import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    CanLoad, Route, UrlSegment
} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private _authService: AuthService,
                private _router: Router) {}

    checkUrl(url: string): boolean {
        if (this._authService.isAuthenticated()) {
          return true;
        }
        this._authService.redirectUrl = url;
        this._router.navigate(['/login']);
        return false;
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.checkUrl(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const url = `/${route.path}`;
        return this.checkUrl(url);
    }
}
