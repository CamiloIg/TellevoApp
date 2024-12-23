import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable((observer) => {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          // Si el usuario está autenticado, permitimos el acceso
          observer.next(true);
        } else {
          // Si no está autenticado, redirigimos a login
          this.router.navigate(['/login']);
          observer.next(false);
        }
      });
    });
  }
}
