import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);

  currentUserSignal = this.currentUser;
  isAuthenticated = this.isAuthenticatedSignal;

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser.set(user);
      this.isAuthenticatedSignal.set(true);
    }
  }

  login(email: string, password: string): Promise<boolean> {
    // TODO: Replace with actual backend API call
    // Mock authentication for now
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock users for different roles
        const mockUsers: Record<string, User> = {
          'admin@clinic.com': { id: '1', email: 'admin@clinic.com', name: 'Admin User', role: 'admin' },
          'doctor@clinic.com': { id: '2', email: 'doctor@clinic.com', name: 'Dr. John Smith', role: 'doctor' },
          'patient@clinic.com': { id: '3', email: 'patient@clinic.com', name: 'Jane Patient', role: 'patient' },
          'nurse@clinic.com': { id: '4', email: 'nurse@clinic.com', name: 'Nurse Mary', role: 'nurse' }
        };

        // Accept any password for demo
        const user = mockUsers[email.toLowerCase()];
        
        if (user) {
          this.currentUser.set(user);
          this.isAuthenticatedSignal.set(true);
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticatedSignal.set(false);
    localStorage.removeItem('currentUser');
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUser();
    return user ? roles.includes(user.role) : false;
  }
}
