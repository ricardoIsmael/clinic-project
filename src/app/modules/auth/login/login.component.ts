import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  error = '';
  loading = false;

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then((success) => {
        if (success) {
          const user = this.authService.currentUserSignal();
          if (user) {
            this.router.navigate([`/dashboard/${user.role}`]);
          }
        } else {
          this.error = 'Invalid email or password. Try: doctor@clinic.com, patient@clinic.com, admin@clinic.com, or nurse@clinic.com';
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
