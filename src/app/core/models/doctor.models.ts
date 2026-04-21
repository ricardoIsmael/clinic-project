export interface Patient {
  id: string;
  name: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  bloodType: string;
  email: string;
  phone: string;
  address: string;
  allergies: string[];
  chronicConditions: string[];
  avatar?: string;
  insuranceNumber?: string;
}

export interface AppointmentHistory {
  id: string;
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  notes: string;
  medications: PrescribedMedication[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: Patient;
  type: AppointmentType;
  start: string;
  end: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  diagnosis?: string;
  medicalReportId?: string;
  prescribedMedications?: PrescribedMedication[];
}

export type AppointmentType =
  | 'general'
  | 'cardiology'
  | 'neurology'
  | 'dermatology'
  | 'orthopedics'
  | 'pediatrics'
  | 'gynecology'
  | 'ophthalmology'
  | 'psychiatry'
  | 'emergency';

export interface AvailabilityBlock {
  id: string;
  start: string;
  end: string;
  type: 'available' | 'break' | 'appointment';
  notes?: string;
  recurrent?: boolean;
}

export interface MedicalReport {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  reportType: 'medical-leave' | 'clinical-report' | 'referral';
  issueDate: string;
  startDate?: string;
  endDate?: string;
  diagnosis: string;
  recommendations: string;
  observations?: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  presentations: string[];
  commonDoses: string[];
  frequency: string[];
  contraindications: string[];
  sideEffects: string[];
  description: string;
}

export interface PrescribedMedication {
  medicationId: string;
  medicationName: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  general: 'Consulta General',
  cardiology: 'Cardiología',
  neurology: 'Neurología',
  dermatology: 'Dermatología',
  orthopedics: 'Ortopedia',
  pediatrics: 'Pediatría',
  gynecology: 'Ginecología',
  ophthalmology: 'Oftalmología',
  psychiatry: 'Psiquiatría',
  emergency: 'Emergencia'
};

export const APPOINTMENT_TYPE_COLORS: Record<AppointmentType, string> = {
  general: '#0d9488',
  cardiology: '#ef4444',
  neurology: '#8b5cf6',
  dermatology: '#f59e0b',
  orthopedics: '#3b82f6',
  pediatrics: '#ec4899',
  gynecology: '#f472b6',
  ophthalmology: '#06b6d4',
  psychiatry: '#6366f1',
  emergency: '#dc2626'
};
