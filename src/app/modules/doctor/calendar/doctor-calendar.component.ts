import { Component, OnInit, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AvailabilitySlot {
  id: string;
  title: string;
  start: string;
  end: string;
  status: 'available' | 'booked';
}

@Component({
  selector: 'app-doctor-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  availabilitySlots: AvailabilitySlot[] = [];

  // Modal state
  showAvailabilityModal = signal(false);
  showEventModal = signal(false);
  selectedDate = signal<Date | null>(null);
  selectedEvent = signal<EventInput | null>(null);

  // Form fields
  startTime = '09:00';
  endTime = '10:00';
  eventTitle = 'Available';
  eventDescription = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    selectable: true,
    selectMirror: true,
    editable: true,
    dayMaxEvents: true,
    weekends: true,
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this),
    height: 'auto',
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day'
    },
    slotMinTime: '07:00:00',
    slotMaxTime: '20:00:00',
    allDaySlot: false,
    slotDuration: '00:30:00',
  };

  ngOnInit(): void {
    this.loadAvailabilitySlots();
  }

  handleDateClick(arg: any): void {
    this.selectedDate.set(arg.date);
    this.showAvailabilityModal.set(true);
  }

  handleEventClick(arg: EventClickArg): void {
    this.selectedEvent.set(arg.event.toPlainObject());
    this.showEventModal.set(true);
  }

  handleEventDrop(arg: any): void {
    this.updateEventTime(arg.event);
  }

  handleEventResize(arg: any): void {
    this.updateEventTime(arg.event);
  }

  updateEventTime(event: any): void {
    // TODO: Call backend API to update event time
    console.log('Event moved/resized:', event.id, event.start, event.end);
  }

  addAvailability(): void {
    const selectedDate = this.selectedDate();
    if (!selectedDate) return;

    const startDateTime = new Date(selectedDate);
    const [startHour, startMinute] = this.startTime.split(':').map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(selectedDate);
    const [endHour, endMinute] = this.endTime.split(':').map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    if (endDateTime <= startDateTime) {
      alert('End time must be after start time');
      return;
    }

    const newEvent: EventInput = {
      id: Date.now().toString(),
      title: this.eventTitle || 'Available',
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      backgroundColor: this.getEventColor(this.eventTitle),
      borderColor: this.getEventColor(this.eventTitle),
      extendedProps: {
        description: this.eventDescription,
        status: 'available'
      }
    };

    // Add event to calendar
    const calendarApi = this.getCalendarApi();
    if (calendarApi) {
      calendarApi.addEvent(newEvent);
    }

    // Save to local array (will be sent to backend later)
    this.availabilitySlots.push({
      id: newEvent.id as string,
      title: newEvent.title as string,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      status: 'available'
    });

    this.closeAvailabilityModal();
    // TODO: Call backend API to save availability
    console.log('New availability slot created:', newEvent);
  }

  deleteEvent(): void {
    const event = this.selectedEvent();
    if (event && event.id) {
      const calendarApi = this.getCalendarApi();
      if (calendarApi) {
        const calendarEvent = calendarApi.getEventById(event.id);
        if (calendarEvent) {
          calendarEvent.remove();
        }
      }
    }
    this.closeEventModal();
    // TODO: Call backend API to delete event
  }

  closeAvailabilityModal(): void {
    this.showAvailabilityModal.set(false);
    this.selectedDate.set(null);
    this.startTime = '09:00';
    this.endTime = '10:00';
    this.eventTitle = 'Available';
    this.eventDescription = '';
  }

  closeEventModal(): void {
    this.showEventModal.set(false);
    this.selectedEvent.set(null);
  }

  private getCalendarApi(): any {
    const calendarEl = document.querySelector('full-calendar');
    return (calendarEl as any)?.getApi();
  }

  private getEventColor(title: string): string {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('available') || lowerTitle.includes('free')) {
      return '#14b8a6'; // primary-500
    } else if (lowerTitle.includes('booked') || lowerTitle.includes('busy')) {
      return '#ef4444'; // red-500
    } else if (lowerTitle.includes('break') || lowerTitle.includes('lunch')) {
      return '#f59e0b'; // amber-500
    } else if (lowerTitle.includes('meeting') || lowerTitle.includes('consultation')) {
      return '#8b5cf6'; // violet-500
    }
    return '#14b8a6'; // default primary color
  }

  private loadAvailabilitySlots(): void {
    // TODO: Load from backend API
    // For now, we'll load from localStorage if available
    const stored = localStorage.getItem('doctorAvailability');
    if (stored) {
      this.availabilitySlots = JSON.parse(stored);
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('doctorAvailability', JSON.stringify(this.availabilitySlots));
  }

  getTodayAppointmentsCount(): number {
    const calendarApi = this.getCalendarApi();
    if (!calendarApi) return 0;
    
    const today = new Date();
    const events = calendarApi.getEvents();
    return events.filter((event: any) => {
      const eventDate = new Date(event.start || '');
      return eventDate.toDateString() === today.toDateString();
    }).length;
  }

  getWeekAppointmentsCount(): number {
    const calendarApi = this.getCalendarApi();
    if (!calendarApi) return 0;
    
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const events = calendarApi.getEvents();
    return events.filter((event: any) => {
      const eventDate = new Date(event.start || '');
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }).length;
  }

  getAvailableSlotsCount(): number {
    const calendarApi = this.getCalendarApi();
    if (!calendarApi) return 0;
    
    const events = calendarApi.getEvents();
    return events.filter((event: any) => 
      event.extendedProps?.status === 'available' || 
      (event.title?.toLowerCase().includes('available') || event.title?.toLowerCase().includes('free'))
    ).length;
  }

  getTotalHoursThisWeek(): number {
    const calendarApi = this.getCalendarApi();
    if (!calendarApi) return 0;
    
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const events = calendarApi.getEvents();
    let totalHours = 0;
    
    events.forEach((event: any) => {
      if (event.start && event.end) {
        const eventDate = new Date(event.start);
        if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
          const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
          totalHours += duration;
        }
      }
    });
    
    return Math.round(totalHours * 10) / 10;
  }

  logout(): void {
    // TODO: Implement logout navigation
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getDescription(): string | undefined {
    const event = this.selectedEvent();
    return event?.extendedProps?.['description'];
  }
}
