import { Injectable } from '@angular/core';
import { PatientPortalData, Prescription } from '../models/patient.models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly portalData: Record<string, PatientPortalData> = {
    '3': {
      profile: {
        id: '3',
        patientCode: 'PAC-0003',
        fullName: 'Jane Patient',
        email: 'patient@clinic.com',
        phone: '+51 987 654 321',
        birthDate: '1993-08-17',
        bloodType: 'O+',
        insurance: 'Salud Protegida Integral',
        primaryDoctor: 'Dra. Lucia Martinez',
        nextAppointment: '2026-04-30T09:30:00'
      },
      labResults: [
        {
          id: 'LAB-22014',
          testName: 'Hemograma completo',
          requestedBy: 'Dra. Lucia Martinez',
          collectedAt: '2026-04-18T08:10:00',
          reportedAt: '2026-04-18T16:45:00',
          status: 'ready',
          summary: 'Parametros hematologicos dentro de valores esperados.',
          metrics: [
            { label: 'Hemoglobina', value: '13.7 g/dL', referenceRange: '12.0 - 15.5 g/dL', status: 'normal' },
            { label: 'Leucocitos', value: '6.8 x10^3/uL', referenceRange: '4.5 - 11.0 x10^3/uL', status: 'normal' },
            { label: 'Plaquetas', value: '280 x10^3/uL', referenceRange: '150 - 450 x10^3/uL', status: 'normal' }
          ]
        },
        {
          id: 'LAB-22027',
          testName: 'Perfil lipidico',
          requestedBy: 'Dr. Carlos Mejia',
          collectedAt: '2026-04-12T07:40:00',
          reportedAt: '2026-04-12T15:20:00',
          status: 'review',
          summary: 'Colesterol LDL ligeramente elevado. Se recomienda seguimiento nutricional.',
          metrics: [
            { label: 'Colesterol total', value: '198 mg/dL', referenceRange: 'Menor a 200 mg/dL', status: 'normal' },
            { label: 'LDL', value: '132 mg/dL', referenceRange: 'Menor a 130 mg/dL', status: 'attention' },
            { label: 'HDL', value: '54 mg/dL', referenceRange: 'Mayor a 40 mg/dL', status: 'normal' }
          ]
        }
      ],
      prescriptions: [
        {
          id: 'RX-1045',
          issuedAt: '2026-04-19',
          validUntil: '2026-05-19',
          doctorName: 'Dra. Lucia Martinez',
          diagnosis: 'Control de gastritis cronica',
          status: 'active',
          medications: [
            { name: 'Omeprazol', dosage: '20 mg', frequency: 'Cada manana antes del desayuno', duration: '30 dias' },
            { name: 'Sucralfato', dosage: '10 mL', frequency: 'Cada 8 horas', duration: '14 dias' }
          ],
          indications: [
            'Evitar comidas irritantes y bebidas carbonatadas.',
            'No suspender el tratamiento sin evaluacion medica.'
          ]
        },
        {
          id: 'RX-1033',
          issuedAt: '2026-04-07',
          validUntil: '2026-04-25',
          doctorName: 'Dr. Carlos Mejia',
          diagnosis: 'Manejo de cefalea tensional',
          status: 'expiring',
          medications: [
            { name: 'Ibuprofeno', dosage: '400 mg', frequency: 'Cada 12 horas si hay dolor', duration: '5 dias' }
          ],
          indications: [
            'Mantener hidratacion adecuada.',
            'Solicitar reevaluacion si el dolor persiste.'
          ]
        }
      ]
    }
  };

  getPortalData(userId: string): PatientPortalData {
    return this.portalData[userId] ?? {
      profile: {
        id: userId,
        patientCode: 'PAC-SIN-DATOS',
        fullName: 'Paciente',
        email: 'sin-correo@clinic.com',
        phone: 'No registrado',
        birthDate: '1990-01-01',
        bloodType: 'No registrado',
        insurance: 'No registrado',
        primaryDoctor: 'Por asignar',
        nextAppointment: ''
      },
      labResults: [],
      prescriptions: []
    };
  }

  buildPrescriptionDownload(prescription: Prescription, patientName: string): { fileName: string; content: string } {
    const medications = prescription.medications
      .map((item, index) => `${index + 1}. ${item.name} - ${item.dosage} - ${item.frequency} - ${item.duration}`)
      .join('\n');

    const indications = prescription.indications
      .map((item, index) => `${index + 1}. ${item}`)
      .join('\n');

    const content = [
      'CLINIC PROJECT - RECETA VIGENTE',
      '',
      `Paciente: ${patientName}`,
      `Receta: ${prescription.id}`,
      `Medico tratante: ${prescription.doctorName}`,
      `Diagnostico: ${prescription.diagnosis}`,
      `Emitida: ${prescription.issuedAt}`,
      `Vigente hasta: ${prescription.validUntil}`,
      '',
      'Medicamentos',
      medications,
      '',
      'Indicaciones',
      indications
    ].join('\n');

    return {
      fileName: `${prescription.id.toLowerCase()}-${patientName.toLowerCase().replace(/\s+/g, '-')}.txt`,
      content
    };
  }
}
