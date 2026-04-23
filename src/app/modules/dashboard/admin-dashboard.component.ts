import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'admin' | 'nurse';
  status: 'active' | 'inactive';
  joinedAt: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // --- State Signals ---
  showAddUserModal = signal(false);
  isSubmitting = signal(false);
  
  // --- Mock Data ---
  kpis = [
    { label: 'Doctores Totales', value: '42', trend: '+3 este mes', icon: 'stethoscope', color: 'teal' },
    { label: 'Pacientes', value: '1,284', trend: '+12% vs mes ant.', icon: 'users', color: 'blue' },
    { label: 'Citas Hoy', value: '18', trend: '4 pendientes', icon: 'calendar', color: 'amber' },
    { label: 'Ingresos Mensuales', value: 15420, trend: '+8.4%', icon: 'credit-card', color: 'violet', isCurrency: true }
  ];

  recentUsers = signal<User[]>([
    { id: '1', name: 'Dr. Alejandro Reyes', email: 'a.reyes@clinic.com', role: 'doctor', status: 'active', joinedAt: '2024-01-15' },
    { id: '2', name: 'Enf. Maria Garcia', email: 'm.garcia@clinic.com', role: 'nurse', status: 'active', joinedAt: '2024-02-10' },
    { id: '3', name: 'Carlos Mendoza', email: 'c.mendoza@gmail.com', role: 'patient', status: 'active', joinedAt: '2024-03-05' },
    { id: '4', name: 'Dra. Elena Solis', email: 'e.solis@clinic.com', role: 'doctor', status: 'inactive', joinedAt: '2023-11-20' },
    { id: '5', name: 'Roberto Gomez', email: 'r.gomez@admin.com', role: 'admin', status: 'active', joinedAt: '2023-10-12' }
  ]);

  activities: Activity[] = [
    { id: '1', user: 'Dr. Reyes', action: 'agregó disponibilidad para mañana', time: 'hace 10 min', icon: 'calendar', color: 'teal' },
    { id: '2', user: 'Sistema', action: 'Nueva cita agendada: Carlos Mendoza', time: 'hace 25 min', icon: 'plus-circle', color: 'blue' },
    { id: '3', user: 'Admin', action: 'Actualizó roles de enfermería', time: 'hace 1 hora', icon: 'shield-check', color: 'violet' },
    { id: '4', user: 'Dra. Solis', action: 'Canceló cita programada', time: 'hace 2 horas', icon: 'x-circle', color: 'red' }
  ];

  // --- Forms ---
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['doctor', Validators.required],
      status: ['active']
    });
  }

  ngOnInit(): void {
    // // TODO: Conectar con API para cargar datos reales
  }

  // --- Actions ---
  toggleUserStatus(user: User): void {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    this.recentUsers.update(users => 
      users.map(u => u.id === user.id ? { ...u, status: newStatus } : u)
    );
    console.log(`Estado de usuario ${user.name} cambiado a ${newStatus}`);
  }

  openModal(): void {
    this.userForm.reset({ role: 'doctor', status: 'active' });
    this.showAddUserModal.set(true);
  }

  closeModal(): void {
    this.showAddUserModal.set(false);
  }

  onSubmitUser(): void {
    if (this.userForm.valid) {
      this.isSubmitting.set(true);
      
      // Simular delay de API
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          ...this.userForm.value,
          joinedAt: new Date().toISOString().split('T')[0]
        };
        
        this.recentUsers.update(users => [newUser, ...users]);
        this.isSubmitting.set(false);
        this.closeModal();
        alert('Usuario agregado exitosamente (Mock)');
      }, 1000);
    }
  }

  generateReport(): void {
    console.log('Generando reporte general del sistema...');
    alert('El reporte se está generando y se descargará automáticamente en unos segundos.');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getRoleBadgeClass(role: string): string {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium ';
    switch(role) {
      case 'doctor': return base + 'bg-teal-100 text-teal-800';
      case 'nurse': return base + 'bg-blue-100 text-blue-800';
      case 'admin': return base + 'bg-violet-100 text-violet-800';
      default: return base + 'bg-slate-100 text-slate-800';
    }
  }
}
