import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import {
  Appointment, Patient, Medication, PrescribedMedication,
  MedicalReport, APPOINTMENT_TYPE_LABELS, APPOINTMENT_TYPE_COLORS
} from '../../../../core/models/doctor.models';

type Tab = 'info' | 'history' | 'consultation' | 'medications';
type ReportType = 'medical-leave' | 'clinical-report' | 'referral';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './appointment-detail.component.html'
})
export class AppointmentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService
  ) {}

  // ─── Data ─────────────────────────────────────────────────────────────────
  appointment = signal<Appointment | null>(null);
  patient     = signal<Patient | null>(null);
  history     = signal<any[]>([]);

  // ─── UI State ─────────────────────────────────────────────────────────────
  activeTab     = signal<Tab>('info');
  showReport    = signal(false);
  reportSaved   = signal(false);
  diagSaved     = signal(false);

  // ─── Diagnosis & Consultation ─────────────────────────────────────────────
  diagnosis      = '';
  observations   = '';

  // ─── Medication search ────────────────────────────────────────────────────
  medQuery        = '';
  medResults      = signal<Medication[]>([]);
  isSearchingMed  = signal(false);
  selectedMedFull = signal<Medication | null>(null);
  prescriptions   = signal<PrescribedMedication[]>([]);

  prescForm = {
    dose: '',
    frequency: '',
    duration: '',
    instructions: ''
  };

  // ─── Medical Report ───────────────────────────────────────────────────────
  reportForm = {
    type:            'medical-leave' as ReportType,
    startDate:       '',
    endDate:         '',
    recommendations: '',
    observations:    ''
  };
  generatedReport = signal<MedicalReport | null>(null);

  readonly typeLabels = APPOINTMENT_TYPE_LABELS;
  readonly typeColors = APPOINTMENT_TYPE_COLORS;

  // ─── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/dashboard/doctor']); return; }

    const appt = this.doctorService.getAppointmentById(id);
    if (!appt) { this.router.navigate(['/dashboard/doctor']); return; }

    this.appointment.set(appt);
    const p = this.doctorService.getPatientById(appt.patientId);
    this.patient.set(p || null);
    this.history.set(this.doctorService.getPatientHistory(appt.patientId));

    if (appt.diagnosis)              this.diagnosis = appt.diagnosis;
    if (appt.prescribedMedications)  this.prescriptions.set(appt.prescribedMedications);
  }

  // ─── Medication ───────────────────────────────────────────────────────────
  onMedSearch(): void {
    if (this.medQuery.length < 2) { this.medResults.set([]); return; }
    this.isSearchingMed.set(true);
    setTimeout(() => {
      this.medResults.set(this.doctorService.searchMedications(this.medQuery));
      this.isSearchingMed.set(false);
    }, 400);
  }

  selectMedication(med: Medication): void {
    this.selectedMedFull.set(med);
    this.prescForm.dose        = med.commonDoses[0] || '';
    this.prescForm.frequency   = med.frequency[0] || '';
    this.prescForm.duration    = '7 días';
    this.prescForm.instructions = '';
    this.medResults.set([]);
    this.medQuery = med.name;
  }

  addPrescription(): void {
    const med = this.selectedMedFull();
    if (!med || !this.prescForm.dose || !this.prescForm.frequency) return;

    const existing = this.prescriptions().find(p => p.medicationId === med.id);
    if (existing) return;

    this.prescriptions.update(list => [...list, {
      medicationId:   med.id,
      medicationName: med.name,
      dose:           this.prescForm.dose,
      frequency:      this.prescForm.frequency,
      duration:       this.prescForm.duration,
      instructions:   this.prescForm.instructions
    }]);

    this.selectedMedFull.set(null);
    this.medQuery = '';
    this.prescForm = { dose: '', frequency: '', duration: '', instructions: '' };
  }

  removePrescription(id: string): void {
    this.prescriptions.update(list => list.filter(p => p.medicationId !== id));
  }

  // ─── Save Consultation ────────────────────────────────────────────────────
  saveConsultation(): void {
    const appt = this.appointment();
    if (!appt) return;
    this.doctorService.updateAppointmentDiagnosis(appt.id, this.diagnosis, this.prescriptions());
    this.diagSaved.set(true);
    setTimeout(() => this.diagSaved.set(false), 3000);
  }

  // ─── Medical Report ───────────────────────────────────────────────────────
  openReportModal(): void {
    this.reportForm.startDate       = new Date().toISOString().split('T')[0];
    this.reportForm.endDate         = '';
    this.reportForm.recommendations = '';
    this.reportForm.observations    = '';
    this.showReport.set(true);
  }

  generateReport(): void {
    const appt = this.appointment();
    const pat  = this.patient();
    if (!appt || !pat) return;

    const report = this.doctorService.generateMedicalReport({
      appointmentId:   appt.id,
      patientId:       pat.id,
      patientName:     pat.name + ' ' + pat.lastName,
      doctorName:      'Dr. Alejandro Reyes',
      doctorSpecialty: this.typeLabels[appt.type] || 'Medicina General',
      reportType:      this.reportForm.type,
      startDate:       this.reportForm.startDate,
      endDate:         this.reportForm.endDate,
      diagnosis:       this.diagnosis || 'Según evaluación médica',
      recommendations: this.reportForm.recommendations,
      observations:    this.reportForm.observations
    });

    this.generatedReport.set(report);
    this.showReport.set(false);
    this.reportSaved.set(true);
    setTimeout(() => this.reportSaved.set(false), 4000);
  }

  printReport(): void {
    window.print();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  goBack(): void {
    this.router.navigate(['/dashboard/doctor']);
  }

  setTab(t: Tab): void { this.activeTab.set(t); }
  setTabStr(t: string): void { this.activeTab.set(t as Tab); }
  setReportType(t: string): void { this.reportForm.type = t as ReportType; }

  getInitials(p: Patient | null): string {
    if (!p) return '?';
    return (p.name[0] || '') + (p.lastName[0] || '');
  }

  formatDate(v: any): string {
    if (!v) return 'N/A';
    return new Date(v).toLocaleString('es-GT', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  getTypeColor(): string {
    const appt = this.appointment();
    return appt ? (this.typeColors[appt.type] || '#0d9488') : '#0d9488';
  }

  getTypeLabel(): string {
    const appt = this.appointment();
    return appt ? (this.typeLabels[appt.type] || appt.type) : '';
  }

  getReportTypeLabel(t: ReportType): string {
    return { 'medical-leave': 'Descanso Médico', 'clinical-report': 'Reporte Clínico', 'referral': 'Referimiento' }[t];
  }

  statusColor(s: string): string {
    return { scheduled: '#0d9488', 'in-progress': '#f59e0b', completed: '#10b981', cancelled: '#ef4444' }[s] || '#64748b';
  }

  statusLabel(s: string): string {
    return { scheduled: 'Programada', 'in-progress': 'En Curso', completed: 'Completada', cancelled: 'Cancelada' }[s] || s;
  }
}
