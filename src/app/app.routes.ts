import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.routes.presentation').then(m => m.PresentationComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: 'doctor',
        canActivate: [authGuard],
        data: { roles: ['doctor'] },
        loadComponent: () => import('./modules/doctor/calendar/doctor-calendar.component').then(m => m.DoctorCalendarComponent)
      },
      {
        path: 'doctor/new-appointment',
        canActivate: [authGuard],
        data: { roles: ['doctor'] },
        loadComponent: () => import('./modules/doctor/appointments/new-appointment/new-appointment.component').then(m => m.NewAppointmentComponent)
      },
      {
        path: 'doctor/appointment/:id',
        canActivate: [authGuard],
        data: { roles: ['doctor'] },
        loadComponent: () => import('./modules/doctor/appointments/appointment-detail/appointment-detail.component').then(m => m.AppointmentDetailComponent)
      },
      {
        path: 'patient',
        canActivate: [authGuard],
        data: { roles: ['patient'] },
        loadComponent: () => import('./modules/patient/portal/patient-portal.component').then(m => m.PatientPortalComponent)
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        data: { roles: ['admin'] },
        loadComponent: () => import('./modules/dashboard/admin-placeholder.component').then(m => m.AdminPlaceholderComponent)
      },
      {
        path: 'nurse',
        canActivate: [authGuard],
        data: { roles: ['nurse'] },
        loadComponent: () => import('./modules/dashboard/nurse-placeholder.component').then(m => m.NursePlaceholderComponent)
      },
      {
        path: '',
        redirectTo: 'doctor',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
