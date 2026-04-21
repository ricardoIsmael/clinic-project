import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import {
  Patient, AppointmentType, APPOINTMENT_TYPE_LABELS, APPOINTMENT_TYPE_COLORS
} from '../../../../core/models/doctor.models';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-appointment.component.html'
})
export class NewAppointmentComponent {

  constructor(private router: Router, private doctorService: DoctorService) {}

  readonly typeLabels = Object.entries(APPOINTMENT_TYPE_LABELS) as [AppointmentType, string][];
  readonly typeColors = APPOINTMENT_TYPE_COLORS;

  // ─── State ────────────────────────────────────────────────────────────────
  step = signal<1 | 2 | 3>(1);
  searchQuery = '';
  searchResults = signal<Patient[]>([]);
  selectedPatient = signal<Patient | null>(null);
  isSearching = signal(false);
  successMsg = signal(false);

  // ─── Form ─────────────────────────────────────────────────────────────────
  form = {
    type:      'general' as AppointmentType,
    date:      '',
    startTime: '09:00',
    endTime:   '09:30',
    notes:     '',
    priority:  'normal' as 'normal' | 'urgent'
  };

  // ─── Search ───────────────────────────────────────────────────────────────
  onSearchInput(): void {
    if (this.searchQuery.length < 2) { this.searchResults.set([]); return; }
    this.isSearching.set(true);
    setTimeout(() => {
      this.searchResults.set(this.doctorService.searchPatients(this.searchQuery));
      this.isSearching.set(false);
    }, 300);
  }

  selectPatient(p: Patient): void {
    this.selectedPatient.set(p);
    this.searchQuery = p.name + ' ' + p.lastName;
    this.searchResults.set([]);
  }

  clearPatient(): void {
    this.selectedPatient.set(null);
    this.searchQuery = '';
  }

  // ─── Steps ────────────────────────────────────────────────────────────────
  nextStep(): void {
    if (this.step() === 1 && !this.selectedPatient()) return;
    if (this.step() === 2 && (!this.form.date || !this.form.startTime)) return;
    this.step.set((this.step() + 1) as any);
  }

  prevStep(): void {
    if (this.step() > 1) this.step.set((this.step() - 1) as any);
  }

  // ─── Submit ────────────────────────────────────────────────────────────────
  submit(): void {
    const patient = this.selectedPatient();
    if (!patient) return;

    const start = new Date(`${this.form.date}T${this.form.startTime}`);
    const end   = new Date(`${this.form.date}T${this.form.endTime}`);

    this.doctorService.createAppointment({
      patientId: patient.id,
      type: this.form.type,
      start: start.toISOString(),
      end: end.toISOString(),
      notes: this.form.notes,
      status: 'scheduled'
    });

    this.successMsg.set(true);
    setTimeout(() => this.router.navigate(['/dashboard/doctor']), 2000);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/doctor']);
  }

  getInitials(p: Patient): string {
    return (p.name[0] || '') + (p.lastName[0] || '');
  }

  getTodayMin(): string {
    return new Date().toISOString().split('T')[0];
  }

  getSelectedTypeLabel(): string {
    const entry = this.typeLabels.find(e => e[0] === this.form.type);
    return entry ? entry[1] : '';
  }

  step1Valid(): boolean { return !!this.selectedPatient(); }
  step2Valid(): boolean { return !!(this.form.date && this.form.startTime && this.form.endTime); }
}
