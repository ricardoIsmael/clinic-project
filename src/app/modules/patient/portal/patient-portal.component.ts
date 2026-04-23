import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PatientService } from '../../../core/services/patient.service';
import { LabResult, PatientProfile, Prescription } from '../../../core/models/patient.models';

@Component({
  selector: 'app-patient-portal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './patient-portal.component.html',
  styleUrls: ['./patient-portal.component.css']
})
export class PatientPortalComponent {
  private readonly authService = inject(AuthService);
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

  private readonly currentUser = computed(() => this.authService.currentUserSignal());
  private readonly portalData = computed(() => this.patientService.getPortalData(this.currentUser()?.id ?? ''));

  readonly profile = computed<PatientProfile>(() => this.portalData().profile);
  readonly labResults = computed<LabResult[]>(() => this.portalData().labResults);
  readonly prescriptions = computed<Prescription[]>(() => this.portalData().prescriptions);
  readonly readyResultsCount = computed(() => this.labResults().filter((result) => result.status === 'ready').length);
  readonly activePrescriptionsCount = computed(() => this.prescriptions().filter((item) => item.status === 'active').length);

  downloadPrescription(prescription: Prescription): void {
    const file = this.patientService.buildPrescriptionDownload(prescription, this.profile().fullName);
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = file.fileName;
    anchor.click();

    window.URL.revokeObjectURL(url);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
