import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const expectedRoles = route.data['roles'] as string[];
    if (expectedRoles && expectedRoles.length > 0) {
      if (authService.hasRole(expectedRoles)) {
        return true;
      }
      // User doesn't have required role, redirect to appropriate dashboard
      const user = authService.currentUserSignal();
      if (user) {
        router.navigate([`/dashboard/${user.role}`]);
        return false;
      }
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
