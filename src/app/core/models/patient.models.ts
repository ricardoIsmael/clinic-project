export interface PatientProfile {
  id: string;
  patientCode: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  bloodType: string;
  insurance: string;
  primaryDoctor: string;
  nextAppointment: string;
}

export interface LabMetric {
  label: string;
  value: string;
  referenceRange: string;
  status: 'normal' | 'attention';
}

export interface LabResult {
  id: string;
  testName: string;
  requestedBy: string;
  collectedAt: string;
  reportedAt: string;
  status: 'ready' | 'review';
  summary: string;
  metrics: LabMetric[];
}

export interface Prescription {
  id: string;
  issuedAt: string;
  validUntil: string;
  doctorName: string;
  diagnosis: string;
  status: 'active' | 'expiring';
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  indications: string[];
}

export interface PatientPortalData {
  profile: PatientProfile;
  labResults: LabResult[];
  prescriptions: Prescription[];
}
