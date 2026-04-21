import { Injectable, signal } from '@angular/core';
import {
  Patient, Appointment, AppointmentType, MedicalReport,
  Medication, PrescribedMedication, AvailabilityBlock
} from '../models/doctor.models';

@Injectable({ providedIn: 'root' })
export class DoctorService {

  // ─── Mock Patients ──────────────────────────────────────────────────────────
  private mockPatients: Patient[] = [
    {
      id: 'p1', name: 'Carlos', lastName: 'Mendoza', age: 45, gender: 'male',
      birthDate: '1979-03-15', bloodType: 'O+', email: 'carlos.mendoza@email.com',
      phone: '+502 5555-1234', address: 'Zona 10, Guatemala City',
      allergies: ['Penicilina', 'Aspirina'],
      chronicConditions: ['Hipertensión', 'Diabetes tipo 2'],
      insuranceNumber: 'IGS-2024-001'
    },
    {
      id: 'p2', name: 'María', lastName: 'García', age: 32, gender: 'female',
      birthDate: '1992-07-22', bloodType: 'A+', email: 'maria.garcia@email.com',
      phone: '+502 5555-5678', address: 'Zona 15, Guatemala City',
      allergies: ['Sulfonamidas'],
      chronicConditions: [],
      insuranceNumber: 'IGS-2024-002'
    },
    {
      id: 'p3', name: 'Roberto', lastName: 'López', age: 58, gender: 'male',
      birthDate: '1966-11-08', bloodType: 'B-', email: 'roberto.lopez@email.com',
      phone: '+502 5555-9012', address: 'Zona 5, Guatemala City',
      allergies: [],
      chronicConditions: ['Artritis reumatoide', 'Hipotiroidismo'],
      insuranceNumber: 'IGS-2024-003'
    },
    {
      id: 'p4', name: 'Ana', lastName: 'Pérez', age: 27, gender: 'female',
      birthDate: '1997-05-30', bloodType: 'AB+', email: 'ana.perez@email.com',
      phone: '+502 5555-3456', address: 'Mixco, Guatemala',
      allergies: ['Ibuprofeno', 'Látex'],
      chronicConditions: [],
      insuranceNumber: 'IGS-2024-004'
    },
    {
      id: 'p5', name: 'Jorge', lastName: 'Velásquez', age: 63, gender: 'male',
      birthDate: '1961-09-14', bloodType: 'O-', email: 'jorge.velasquez@email.com',
      phone: '+502 5555-7890', address: 'Villa Nueva, Guatemala',
      allergies: ['Morfina'],
      chronicConditions: ['Enfermedad coronaria', 'EPOC'],
      insuranceNumber: 'IGS-2024-005'
    }
  ];

  // ─── Mock Appointment History ─────────────────────────────────────────────
  private mockHistory: Record<string, any[]> = {
    p1: [
      { id: 'h1', date: '2024-03-10', type: 'Consulta General', doctor: 'Dr. Rodríguez', diagnosis: 'Hipertensión controlada', notes: 'Ajuste de medicamento antihipertensivo', medications: [{ medicationName: 'Losartan 50mg', dose: '50mg', frequency: 'Una vez al día', duration: '3 meses' }] },
      { id: 'h2', date: '2024-01-15', type: 'Cardiología', doctor: 'Dr. Torres', diagnosis: 'Arritmia leve', notes: 'Se solicitó Holter 24h', medications: [] },
      { id: 'h3', date: '2023-11-20', type: 'Consulta General', doctor: 'Dr. Rodríguez', diagnosis: 'Control de diabetes', notes: 'A1c en 7.2%, dentro del objetivo', medications: [{ medicationName: 'Metformina 850mg', dose: '850mg', frequency: 'Dos veces al día', duration: 'Continuo' }] }
    ],
    p2: [
      { id: 'h4', date: '2024-02-28', type: 'Ginecología', doctor: 'Dra. Ramírez', diagnosis: 'Control anual', notes: 'Exámenes de rutina normales', medications: [] },
      { id: 'h5', date: '2023-12-05', type: 'Dermatología', doctor: 'Dr. Castillo', diagnosis: 'Dermatitis alérgica', notes: 'Reacción a cosmético', medications: [{ medicationName: 'Hidrocortisona crema 1%', dose: 'Aplicación tópica', frequency: 'Dos veces al día', duration: '2 semanas' }] }
    ],
    p3: [
      { id: 'h6', date: '2024-04-01', type: 'Ortopedia', doctor: 'Dr. Morales', diagnosis: 'Exacerbación artritis', notes: 'Infiltración articular rodilla derecha', medications: [{ medicationName: 'Prednisona 10mg', dose: '10mg', frequency: 'Una vez al día', duration: '1 semana' }] },
      { id: 'h7', date: '2024-02-10', type: 'Consulta General', doctor: 'Dr. Rodríguez', diagnosis: 'Control hipotiroidismo', notes: 'TSH normal, mantener dosis', medications: [{ medicationName: 'Levotiroxina 75mcg', dose: '75mcg', frequency: 'En ayunas', duration: 'Continuo' }] }
    ],
    p4: [], p5: [
      { id: 'h8', date: '2024-03-20', type: 'Cardiología', doctor: 'Dr. Torres', diagnosis: 'Control post-cateterismo', notes: 'Evolución favorable', medications: [{ medicationName: 'Atorvastatina 40mg', dose: '40mg', frequency: 'Una vez al día', duration: 'Continuo' }] }
    ]
  };

  // ─── Mock Appointments ───────────────────────────────────────────────────
  private appointments: Appointment[] = [
    {
      id: 'a1', patientId: 'p1', type: 'cardiology',
      start: this.todayAt(9, 0), end: this.todayAt(9, 30),
      status: 'scheduled', notes: 'Control mensual de presión arterial'
    },
    {
      id: 'a2', patientId: 'p2', type: 'general',
      start: this.todayAt(10, 0), end: this.todayAt(10, 30),
      status: 'scheduled', notes: 'Resultados de laboratorio'
    },
    {
      id: 'a3', patientId: 'p3', type: 'orthopedics',
      start: this.todayAt(11, 30), end: this.todayAt(12, 0),
      status: 'scheduled', notes: 'Revisión post-infiltración'
    },
    {
      id: 'a4', patientId: 'p5', type: 'cardiology',
      start: this.todayAt(14, 0), end: this.todayAt(14, 30),
      status: 'scheduled', notes: 'Control coronario mensual'
    }
  ];

  // ─── Mock Medications Database ───────────────────────────────────────────
  private medicationsDb: Medication[] = [
    { id: 'm1', name: 'Amoxicilina', genericName: 'Amoxicillin', category: 'Antibiótico', presentations: ['250mg cápsulas', '500mg cápsulas', '250mg/5ml suspensión'], commonDoses: ['250mg', '500mg', '875mg'], frequency: ['Cada 8 horas', 'Cada 12 horas'], contraindications: ['Alergia a penicilinas', 'Mononucleosis infecciosa'], sideEffects: ['Náuseas', 'Diarrea', 'Erupciones cutáneas'], description: 'Antibiótico de amplio espectro de la familia de las penicilinas, eficaz contra infecciones bacterianas.' },
    { id: 'm2', name: 'Ibuprofeno', genericName: 'Ibuprofen', category: 'AINE / Analgésico', presentations: ['200mg tabletas', '400mg tabletas', '600mg tabletas', '100mg/5ml suspensión'], commonDoses: ['200mg', '400mg', '600mg'], frequency: ['Cada 6 horas', 'Cada 8 horas'], contraindications: ['Úlcera péptica', 'Insuficiencia renal', 'Alergia a AINEs'], sideEffects: ['Irritación gástrica', 'Cefalea', 'Mareos'], description: 'Antiinflamatorio no esteroideo (AINE) con propiedades analgésicas, antipiréticas y antiinflamatorias.' },
    { id: 'm3', name: 'Metformina', genericName: 'Metformin', category: 'Antidiabético', presentations: ['500mg tabletas', '850mg tabletas', '1000mg tabletas'], commonDoses: ['500mg', '850mg', '1000mg'], frequency: ['Una vez al día', 'Dos veces al día', 'Tres veces al día'], contraindications: ['Insuficiencia renal severa', 'Insuficiencia hepática', 'Alcoholismo'], sideEffects: ['Náuseas', 'Diarrea', 'Sabor metálico'], description: 'Biguanida de primera línea en el tratamiento de la diabetes mellitus tipo 2.' },
    { id: 'm4', name: 'Losartán', genericName: 'Losartan', category: 'Antihipertensivo (ARA-II)', presentations: ['25mg tabletas', '50mg tabletas', '100mg tabletas'], commonDoses: ['25mg', '50mg', '100mg'], frequency: ['Una vez al día'], contraindications: ['Embarazo', 'Hiperpotasemia severa', 'Estenosis bilateral de arteria renal'], sideEffects: ['Mareos', 'Hiperpotasemia', 'Tos (menor que IECAs)'], description: 'Antagonista del receptor de angiotensina II, utilizado en hipertensión y nefroprotección en diabéticos.' },
    { id: 'm5', name: 'Omeprazol', genericName: 'Omeprazole', category: 'Inhibidor de bomba de protones', presentations: ['10mg cápsulas', '20mg cápsulas', '40mg cápsulas'], commonDoses: ['10mg', '20mg', '40mg'], frequency: ['Una vez al día en ayunas', 'Dos veces al día'], contraindications: ['Hipersensibilidad al omeprazol', 'Uso con clopidogrel (relativo)'], sideEffects: ['Cefalea', 'Náuseas', 'Hipomagnesemia crónica'], description: 'Inhibidor de la bomba de protones (IBP) para tratamiento de úlceras, ERGE y gastroprotección.' },
    { id: 'm6', name: 'Atorvastatina', genericName: 'Atorvastatin', category: 'Estatina / Hipolipemiante', presentations: ['10mg tabletas', '20mg tabletas', '40mg tabletas', '80mg tabletas'], commonDoses: ['10mg', '20mg', '40mg', '80mg'], frequency: ['Una vez al día (noche)'], contraindications: ['Enfermedad hepática activa', 'Embarazo y lactancia', 'Miopatía'], sideEffects: ['Mialgia', 'Elevación de transaminasas', 'Cefalea'], description: 'Estatina potente para reducción de colesterol LDL y prevención cardiovascular.' },
    { id: 'm7', name: 'Azitromicina', genericName: 'Azithromycin', category: 'Antibiótico macrólido', presentations: ['250mg cápsulas', '500mg tabletas', '200mg/5ml suspensión'], commonDoses: ['250mg', '500mg'], frequency: ['Una vez al día'], contraindications: ['Hipersensibilidad a macrólidos', 'Arritmias cardíacas (QTc prolongado)'], sideEffects: ['Náuseas', 'Diarrea', 'Prolongación QT'], description: 'Antibiótico macrólido de amplio espectro con actividad intracelular, útil en infecciones respiratorias.' },
    { id: 'm8', name: 'Paracetamol', genericName: 'Acetaminophen', category: 'Analgésico / Antipirético', presentations: ['325mg tabletas', '500mg tabletas', '1g tabletas', '160mg/5ml jarabe'], commonDoses: ['325mg', '500mg', '1000mg'], frequency: ['Cada 4-6 horas', 'Cada 6-8 horas'], contraindications: ['Insuficiencia hepática severa', 'Alcoholismo crónico'], sideEffects: ['Hepatotoxicidad en sobredosis', 'Reacciones alérgicas (raro)'], description: 'Analgésico y antipirético ampliamente utilizado, con buena tolerancia gástrica.' },
    { id: 'm9', name: 'Prednisona', genericName: 'Prednisone', category: 'Corticosteroide', presentations: ['5mg tabletas', '10mg tabletas', '20mg tabletas', '50mg tabletas'], commonDoses: ['5mg', '10mg', '20mg', '40mg'], frequency: ['Una vez al día (mañana)', 'Dos veces al día'], contraindications: ['Infecciones sistémicas no tratadas', 'Psicosis no controlada', 'Hipersensibilidad'], sideEffects: ['Hiperglucemia', 'Osteoporosis', 'Síndrome de Cushing iatrogénico'], description: 'Corticosteroide de uso sistémico para condiciones inflamatorias, autoinmunes y alérgicas.' },
    { id: 'm10', name: 'Levotiroxina', genericName: 'Levothyroxine', category: 'Hormona tiroidea', presentations: ['25mcg tabletas', '50mcg tabletas', '75mcg tabletas', '100mcg tabletas'], commonDoses: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg'], frequency: ['Una vez al día en ayunas'], contraindications: ['Tirotoxicosis', 'Infarto agudo no tratado', 'Insuficiencia suprarrenal'], sideEffects: ['Taquicardia', 'Insomnio', 'Temblor (en sobredosis)'], description: 'Hormona tiroidea sintética para el tratamiento del hipotiroidismo.' },
    { id: 'm11', name: 'Ciprofloxacino', genericName: 'Ciprofloxacin', category: 'Antibiótico fluoroquinolona', presentations: ['250mg tabletas', '500mg tabletas', '750mg tabletas'], commonDoses: ['250mg', '500mg', '750mg'], frequency: ['Cada 12 horas'], contraindications: ['Epilepsia', 'Niños en desarrollo óseo', 'Prolongación QT'], sideEffects: ['Tendinopatía', 'Náuseas', 'Fotosensibilidad'], description: 'Fluoroquinolona de amplio espectro, efectiva en infecciones urinarias, gastrointestinales y respiratorias.' },
    { id: 'm12', name: 'Amlodipino', genericName: 'Amlodipine', category: 'Antihipertensivo (BCC)', presentations: ['2.5mg tabletas', '5mg tabletas', '10mg tabletas'], commonDoses: ['2.5mg', '5mg', '10mg'], frequency: ['Una vez al día'], contraindications: ['Hipotensión severa', 'Estenosis aórtica grave', 'Shock cardiogénico'], sideEffects: ['Edema periférico', 'Cefalea', 'Rubor facial'], description: 'Bloqueador de canales de calcio dihidropiridínico para hipertensión y angina de pecho.' }
  ];

  // ─── Signals ─────────────────────────────────────────────────────────────
  selectedAppointment = signal<Appointment | null>(null);
  showAppointmentDetail = signal(false);

  // ─── Patient Methods ─────────────────────────────────────────────────────
  getPatients(): Patient[] { return this.mockPatients; }

  searchPatients(query: string): Patient[] {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return this.mockPatients.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      p.insuranceNumber?.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
    );
  }

  getPatientById(id: string): Patient | undefined {
    return this.mockPatients.find(p => p.id === id);
  }

  getPatientHistory(patientId: string): any[] {
    return this.mockHistory[patientId] || [];
  }

  // ─── Appointment Methods ─────────────────────────────────────────────────
  getAppointments(): Appointment[] {
    return this.appointments.map(a => ({
      ...a, patient: this.getPatientById(a.patientId)
    }));
  }

  getAppointmentById(id: string): Appointment | undefined {
    const appt = this.appointments.find(a => a.id === id);
    if (!appt) return undefined;
    return { ...appt, patient: this.getPatientById(appt.patientId) };
  }

  createAppointment(data: Partial<Appointment>): Appointment {
    const newAppt: Appointment = {
      id: 'a' + Date.now(),
      patientId: data.patientId!,
      type: data.type || 'general',
      start: data.start!,
      end: data.end!,
      status: 'scheduled',
      notes: data.notes,
      patient: this.getPatientById(data.patientId!)
    };
    this.appointments.push(newAppt);
    return newAppt;
  }

  updateAppointmentDiagnosis(id: string, diagnosis: string, medications: PrescribedMedication[]): void {
    const appt = this.appointments.find(a => a.id === id);
    if (appt) {
      appt.diagnosis = diagnosis;
      appt.prescribedMedications = medications;
      appt.status = 'completed';
    }
  }

  // ─── Medication Methods ─────────────────────────────────────────────────
  searchMedications(query: string): Medication[] {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return this.medicationsDb.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.genericName.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }

  // ─── Medical Report ─────────────────────────────────────────────────────
  generateMedicalReport(report: Partial<MedicalReport>): MedicalReport {
    return {
      id: 'rep-' + Date.now(),
      appointmentId: report.appointmentId || '',
      patientId: report.patientId || '',
      patientName: report.patientName || '',
      doctorName: report.doctorName || 'Dr. Alejandro Reyes',
      doctorSpecialty: report.doctorSpecialty || 'Medicina General',
      reportType: report.reportType || 'medical-leave',
      issueDate: new Date().toISOString().split('T')[0],
      startDate: report.startDate,
      endDate: report.endDate,
      diagnosis: report.diagnosis || '',
      recommendations: report.recommendations || '',
      observations: report.observations
    };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────
  private todayAt(h: number, m: number): string {
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  }
}
