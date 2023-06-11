import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SampService } from './samp.service';

@Injectable({
  providedIn: 'root'
})
export class GrdGuardGuard implements CanActivate {
  constructor(private auth: SampService, private rout: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.isLoged.pipe(
        tap((isLoged) => {
          if (!isLoged) {
            const returnUrl = state.url;
            this.rout.navigate(['login'], { queryParams: { returnUrl } });
          } else {
            map((loggedIn) => (loggedIn ? true : false));
          }
        })
      );
    }
  }
