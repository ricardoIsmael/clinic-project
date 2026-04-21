import { Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../../../core/services/doctor.service';
import { Appointment, APPOINTMENT_TYPE_LABELS, APPOINTMENT_TYPE_COLORS, AppointmentType } from '../../../core/models/doctor.models';

interface AvailabilitySlot {
  id: string;
  title: string;
  start: string;
  end: string;
  status: 'available' | 'booked' | 'break';
}

@Component({
  selector: 'app-doctor-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, FormsModule, DatePipe],
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {

  constructor(private router: Router, private doctorService: DoctorService) {}

  readonly appointmentTypeLabels = APPOINTMENT_TYPE_LABELS;

  // ─── UI State ──────────────────────────────────────────────────────────────
  showAvailabilityModal = signal(false);
  showEventModal        = signal(false);
  activeTab             = signal<'info' | 'patient' | 'actions'>('info');

  selectedDateRange = signal<{ start: Date; end: Date } | null>(null);
  selectedEvent     = signal<any | null>(null);
  selectedAppointment = signal<Appointment | null>(null);

  // ─── Form fields ───────────────────────────────────────────────────────────
  blockType: 'available' | 'break' = 'available';
  blockNotes = '';

  // Pre-filled from calendar selection
  formStartTime = '09:00';
  formEndTime   = '10:00';

  availabilitySlots: AvailabilitySlot[] = [];

  // ─── FullCalendar Options ──────────────────────────────────────────────────
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left:   'prev,next today',
      center: 'title',
      right:  'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

    // ── Availability settings ──
    selectable:   true,
    selectMirror: true,
    editable:     true,
    dayMaxEvents: true,

    // ── Block sundays ──
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5, 6], // Mon – Sat
      startTime: '07:00',
      endTime: '20:00'
    },
    selectConstraint: 'businessHours',
    eventConstraint:  'businessHours',

    // Sunday highlight — handled via dayCellClassNames
    dayCellClassNames: (arg) => {
      if (arg.date.getDay() === 0) return ['fc-day-sunday-blocked'];
      return [];
    },

    slotMinTime:  '07:00:00',
    slotMaxTime:  '20:00:00',
    allDaySlot:   false,
    slotDuration: '00:30:00',
    height:       'auto',

    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week:  'Semana',
      day:   'Día'
    },

    events: [],

    // ── Handlers ──
    select:      this.handleSelect.bind(this),
    eventClick:  this.handleEventClick.bind(this),
    eventDrop:   this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this),

    // ── Locale ──
    locale: 'es',
    firstDay: 1
  };

  // ─── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadSavedSlots();
    this.loadAppointments();
  }

  // ─── Handlers ──────────────────────────────────────────────────────────────
  handleSelect(arg: DateSelectArg): void {
    const day = arg.start.getDay();
    if (day === 0) {
      this.getCalendarApi()?.unselect();
      return;
    }
    this.selectedDateRange.set({ start: arg.start, end: arg.end });
    this.formStartTime = this.toTimeString(arg.start);
    this.formEndTime   = this.toTimeString(arg.end);
    this.blockType  = 'available';
    this.blockNotes = '';
    this.showAvailabilityModal.set(true);
  }

  handleEventClick(arg: EventClickArg): void {
    const eventId = arg.event.id;
    const appt = this.doctorService.getAppointmentById(eventId);
    if (appt) {
      this.selectedAppointment.set(appt);
      this.selectedEvent.set(arg.event.toPlainObject());
      this.activeTab.set('info');
      this.showEventModal.set(true);
    } else {
      this.selectedEvent.set(arg.event.toPlainObject());
      this.selectedAppointment.set(null);
      this.activeTab.set('info');
      this.showEventModal.set(true);
    }
  }

  handleEventDrop(arg: any): void {
    if (arg.event.start?.getDay() === 0) { arg.revert(); return; }
  }

  handleEventResize(arg: any): void {
    if (arg.event.start?.getDay() === 0) { arg.revert(); return; }
  }

  // ─── Availability Modal ────────────────────────────────────────────────────
  addAvailabilityBlock(): void {
    const range = this.selectedDateRange();
    if (!range) return;

    const start = new Date(range.start);
    const [sh, sm] = this.formStartTime.split(':').map(Number);
    start.setHours(sh, sm, 0, 0);

    const end = new Date(range.start);
    const [eh, em] = this.formEndTime.split(':').map(Number);
    end.setHours(eh, em, 0, 0);

    if (end <= start) { alert('La hora de fin debe ser posterior al inicio.'); return; }

    const color = this.blockType === 'available' ? '#14b8a6' : '#f59e0b';
    const title = this.blockType === 'available' ? '🟢 Disponible' : '☕ Descanso';

    const event: EventInput = {
      id:              'slot-' + Date.now(),
      title,
      start:           start.toISOString(),
      end:             end.toISOString(),
      backgroundColor: color,
      borderColor:     color,
      extendedProps: { type: this.blockType, notes: this.blockNotes }
    };

    this.getCalendarApi()?.addEvent(event);
    this.availabilitySlots.push({
      id: event.id as string,
      title,
      start: start.toISOString(),
      end:   end.toISOString(),
      status: this.blockType === 'available' ? 'available' : 'booked'
    });

    this.saveSlots();
    this.closeAvailabilityModal();
  }

  closeAvailabilityModal(): void {
    this.showAvailabilityModal.set(false);
    this.selectedDateRange.set(null);
    this.getCalendarApi()?.unselect();
  }

  // ─── Event Modal ───────────────────────────────────────────────────────────
  closeEventModal(): void {
    this.showEventModal.set(false);
    this.selectedEvent.set(null);
    this.selectedAppointment.set(null);
  }

  deleteSelectedEvent(): void {
    const ev = this.selectedEvent();
    if (ev?.id) {
      this.getCalendarApi()?.getEventById(ev.id)?.remove();
    }
    this.closeEventModal();
  }

  goToAppointmentDetail(): void {
    const appt = this.selectedAppointment();
    if (appt) {
      this.closeEventModal();
      this.router.navigate(['/dashboard/doctor/appointment', appt.id]);
    }
  }

  goToNewAppointment(): void {
    this.router.navigate(['/dashboard/doctor/new-appointment']);
  }

  // ─── Stats ─────────────────────────────────────────────────────────────────
  getTodayCount(): number {
    const api = this.getCalendarApi();
    if (!api) return 0;
    const today = new Date().toDateString();
    return api.getEvents().filter((e: any) => new Date(e.start).toDateString() === today).length;
  }

  getWeekCount(): number {
    const api = this.getCalendarApi();
    if (!api) return 0;
    const now = new Date();
    const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    return api.getEvents().filter((e: any) => {
      const d = new Date(e.start);
      return d >= mon && d <= sun;
    }).length;
  }

  getAvailableCount(): number {
    const api = this.getCalendarApi();
    if (!api) return 0;
    return api.getEvents().filter((e: any) =>
      e.extendedProps?.type === 'available' || e.title?.includes('Disponible')
    ).length;
  }

  getAppointmentsCount(): number {
    return this.doctorService.getAppointments().length;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────
  private loadAppointments(): void {
    const appts = this.doctorService.getAppointments();
    const api   = this.getCalendarApi();
    appts.forEach(a => {
      const color = APPOINTMENT_TYPE_COLORS[a.type] || '#0d9488';
      const label = APPOINTMENT_TYPE_LABELS[a.type] || a.type;
      const event: EventInput = {
        id:              a.id,
        title:           `👤 ${a.patient?.name} ${a.patient?.lastName} — ${label}`,
        start:           a.start,
        end:             a.end,
        backgroundColor: color,
        borderColor:     color,
        extendedProps:   { appointmentType: a.type, patientId: a.patientId }
      };
      if (api) { api.addEvent(event); }
      else {
        (this.calendarOptions.events as EventInput[]).push(event);
      }
    });
  }

  private loadSavedSlots(): void {
    const stored = localStorage.getItem('doctorAvailability');
    if (stored) {
      this.availabilitySlots = JSON.parse(stored);
      this.availabilitySlots.forEach(s => {
        (this.calendarOptions.events as EventInput[]).push({
          id: s.id, title: s.title,
          start: s.start, end: s.end,
          backgroundColor: s.status === 'available' ? '#14b8a6' : '#f59e0b',
          borderColor:     s.status === 'available' ? '#14b8a6' : '#f59e0b'
        });
      });
    }
  }

  private saveSlots(): void {
    localStorage.setItem('doctorAvailability', JSON.stringify(this.availabilitySlots));
  }

  getCalendarApi(): any {
    const el = document.querySelector('full-calendar');
    return (el as any)?.getApi?.();
  }

  toTimeString(d: Date): string {
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  formatDate(val: any): string {
    if (!val) return 'N/A';
    return new Date(val).toLocaleString('es-GT', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  formatDayHeader(d: Date): string {
    return d.toLocaleDateString('es-GT', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getPatientInitials(appt: Appointment | null): string {
    if (!appt?.patient) return '?';
    return (appt.patient.name[0] || '') + (appt.patient.lastName[0] || '');
  }

  getTypeLabel(type: AppointmentType): string {
    return APPOINTMENT_TYPE_LABELS[type] || type;
  }

  getTypeColor(type: AppointmentType): string {
    return APPOINTMENT_TYPE_COLORS[type] || '#0d9488';
  }

  getEventType(): string {
    return this.selectedEvent()?.extendedProps?.appointmentType
      ? this.getTypeLabel(this.selectedEvent().extendedProps.appointmentType)
      : (this.selectedEvent()?.extendedProps?.type === 'available' ? 'Disponible' : 'Bloque');
  }
}
