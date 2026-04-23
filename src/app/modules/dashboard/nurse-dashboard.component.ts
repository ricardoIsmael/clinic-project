import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Appointment {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  status: 'pending' | 'attended' | 'waiting';
  room: string;
}

interface DoctorAvailability {
  name: string;
  specialty: string;
  status: 'available' | 'busy' | 'away';
  nextSlot: string;
}

interface Notification {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'urgent';
}

@Component({
  selector: 'app-nurse-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {
  // --- UI State ---
  showVitalsModal = signal(false);
  selectedPatient = signal<string | null>(null);
  isSubmittingVitals = signal(false);

  // --- Mock Data ---
  appointments = signal<Appointment[]>([
    { id: '1', time: '08:30', patient: 'Roberto Gomez', doctor: 'Dr. Alejandro Reyes', status: 'waiting', room: 'Consultorio 1' },
    { id: '2', time: '09:00', patient: 'Lucia Fernandez', doctor: 'Dra. Elena Solis', status: 'pending', room: 'Consultorio 3' },
    { id: '3', time: '09:30', patient: 'Marcos Ruiz', doctor: 'Dr. Alejandro Reyes', status: 'pending', room: 'Consultorio 1' },
    { id: '4', time: '10:00', patient: 'Ana Beltran', doctor: 'Dr. Sergio Luna', status: 'pending', room: 'Consultorio 2' },
    { id: '5', time: '08:00', patient: 'Carlos Mendoza', doctor: 'Dra. Elena Solis', status: 'attended', room: 'Consultorio 3' }
  ]);

  doctors = signal<DoctorAvailability[]>([
    { name: 'Dr. Alejandro Reyes', specialty: 'Medicina General', status: 'busy', nextSlot: '09:30' },
    { name: 'Dra. Elena Solis', specialty: 'Pediatría', status: 'available', nextSlot: 'Ahora' },
    { name: 'Dr. Sergio Luna', specialty: 'Cardiología', status: 'away', nextSlot: '10:00' }
  ]);

  notifications = signal<Notification[]>([
    { id: '1', message: 'Paciente Roberto Gomez llegó a sala de espera', time: 'hace 5 min', type: 'info' },
    { id: '2', message: 'Urgencia en Triaje - Consultorio 4', time: 'hace 12 min', type: 'urgent' },
    { id: '3', message: 'Dra. Solis solicita toma de presión - Lucia Fernandez', time: 'hace 20 min', type: 'warning' }
  ]);

  // --- Forms ---
  vitalsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.vitalsForm = this.fb.group({
      patient: ['', Validators.required],
      temp: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      pressure: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      heartRate: ['', [Validators.required, Validators.min(40), Validators.max(200)]],
      oxygen: ['', [Validators.required, Validators.min(50), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    // // TODO: Conectar con API
  }

  // --- Actions ---
  markAsAttended(appointment: Appointment): void {
    this.appointments.update(appts => 
      appts.map(a => a.id === appointment.id ? { ...a, status: 'attended' } : a)
    );
    console.log(`Cita de ${appointment.patient} marcada como atendida`);
  }

  openVitalsModal(patientName: string): void {
    this.selectedPatient.set(patientName);
    this.vitalsForm.patchValue({ patient: patientName });
    this.showVitalsModal.set(true);
  }

  closeVitalsModal(): void {
    this.showVitalsModal.set(false);
    this.vitalsForm.reset();
  }

  onSubmitVitals(): void {
    if (this.vitalsForm.valid) {
      this.isSubmittingVitals.set(true);
      
      // Simular delay de API
      setTimeout(() => {
        console.log('Signos vitales registrados:', this.vitalsForm.value);
        this.isSubmittingVitals.set(false);
        this.closeVitalsModal();
        alert('Signos vitales registrados exitosamente en el historial del paciente (Mock)');
      }, 1000);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getStatusClass(status: string): string {
    const base = 'px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ';
    switch(status) {
      case 'attended': return base + 'bg-slate-100 text-slate-500';
      case 'waiting': return base + 'bg-amber-100 text-amber-700 animate-pulse';
      case 'pending': return base + 'bg-teal-100 text-teal-700';
      default: return base + 'bg-gray-100 text-gray-500';
    }
  }

  getDoctorStatusClass(status: string): string {
    const base = 'w-2 h-2 rounded-full inline-block mr-2 ';
    switch(status) {
      case 'available': return base + 'bg-green-500';
      case 'busy': return base + 'bg-red-500';
      case 'away': return base + 'bg-amber-500';
      default: return base + 'bg-slate-300';
    }
  }
}
