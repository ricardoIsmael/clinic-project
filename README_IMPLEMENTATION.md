# ClinicCare - Angular Application

## Description
A comprehensive clinic management system with role-based access for doctors, patients, admins, and nurses. Features include a professional login page and an advanced calendar system for doctors to manage their availability.

## Features Implemented

### 1. Authentication System
- ✅ Beautiful, modern login page with gradient design
- ✅ Role-based authentication (doctor, patient, admin, nurse)
- ✅ Auth guard for protected routes
- ✅ Mock authentication (ready for backend integration)

### 2. Doctor Dashboard
- ✅ Interactive FullCalendar integration
- ✅ Month, Week, and Day views
- ✅ Click on dates to add availability
- ✅ Drag and drop events to reschedule
- ✅ Event management (add, view, delete)
- ✅ Statistics cards (today's appointments, weekly stats, etc.)
- ✅ Beautiful modals for event management
- ✅ Color-coded events (available, booked, break, meeting)

### 3. Project Structure
```
src/app/
├── core/                      # Core services and guards
│   ├── guards/
│   │   └── auth.guard.ts     # Route protection
│   ├── models/
│   │   └── user.model.ts     # User interface
│   └── services/
│       └── auth.service.ts   # Authentication service
├── modules/                   # Feature modules
│   ├── auth/
│   │   └── login/
│   │       └── login.component.ts
│   ├── doctor/
│   │   └── calendar/
│   │       └── doctor-calendar.component.ts
│   └── dashboard/
│       ├── patient-placeholder.component.ts
│       ├── admin-placeholder.component.ts
│       └── nurse-placeholder.component.ts
└── components/                # Presentation page components
```

### 4. Technologies Used
- Angular 17 (Standalone Components)
- Tailwind CSS for styling
- FullCalendar for calendar functionality
- Angular Router with lazy loading
- Reactive Forms
- Signals for state management

## Demo Credentials

Use these emails to login (any password works):

- **Doctor**: `doctor@clinic.com`
- **Patient**: `patient@clinic.com`
- **Admin**: `admin@clinic.com`
- **Nurse**: `nurse@clinic.com`

## Running the Application

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`

### Build
```bash
ng build
```
Build artifacts will be stored in the `dist/` directory.

## Backend Integration Points

The application is ready for backend integration. Look for `TODO` comments in:
- `auth.service.ts` - Replace mock authentication with API calls
- `doctor-calendar.component.ts` - Connect calendar events to backend API
- Availability slots saving/loading

## Git Configuration

A `.gitignore` file has been created to prevent committing:
- node_modules/
- dist/
- .angular/
- .env files
- IDE configurations
- OS files

## Next Steps

You can continue developing the other role dashboards (patient, admin, nurse) following the same modular structure.

## Color Scheme

The application uses your existing Tailwind color palette:
- **Primary**: Teal (#0d9488, #14b8a6, etc.)
- **Secondary**: Slate (#475569, #64748b, etc.)

All new components follow this color scheme for consistency.
