# ClinicCare - Implementación de Dashboards Admin y Nurse

## 📋 Descripción
Este documento contiene el prompt y las especificaciones completas para implementar los dashboards de **Administrador** y **Enfermera** en la aplicación ClinicCare, siguiendo la misma arquitectura y calidad del dashboard de Doctor existente.

---

## 🎯 Prompt de Implementación

```markdown
# Prompt: Implementar Dashboards de Admin y Nurse en ClinicCare

## Contexto
Eres un desarrollador Angular especializado en componentes standalone, Tailwind CSS y buenas prácticas. Trabajas en ClinicCare, una aplicación de gestión clínica que ya tiene implementado:

- Login con autenticación por roles (doctor, patient, admin, nurse)
- Auth guard y lazy loading
- Dashboard de Doctor con FullCalendar para gestión de disponibilidad
- Placeholders actuales para Admin y Nurse en `src/app/modules/dashboard/`

## Tecnologías
- Angular 17 (Standalone Components)
- Tailwind CSS (colores primarios: Teal `#0d9488`, `#14b8a6` | secundarios: Slate `#475569`, `#64748b`)
- Angular Router, Reactive Forms, Signals
- FullCalendar (solo si necesitas calendario)

## Tarea principal
Reemplazar los placeholders de **Admin Dashboard** y **Nurse Dashboard** con dashboards completos, funcionales y profesionales, siguiendo la misma calidad del doctor calendar.

### 1. Admin Dashboard (`admin-dashboard.component.ts`)
**Responsabilidades:**
- Vista general del sistema (tarjetas con KPIs: total doctores, pacientes, citas hoy, ingresos del mes)
- Tabla de usuarios recientes con rol, email, estado (activo/inactivo)
- Botón para "Agregar usuario" (modal con form: nombre, email, rol)
- Gráfico simple de citas por día de la semana (usando Chart.js o Tailwind + datos mock)
- Lista de actividades recientes (ej: "Dr. López agregó disponibilidad", "Nueva cita agendada")
- Botón para generar reporte (simulado con console.log o alert)

**Mock data:** Crear servicios mock internos (reemplazables por API después)

### 2. Nurse Dashboard (`nurse-dashboard.component.ts`)
**Responsabilidades:**
- Ver citas del día (tarjeta con lista: hora, paciente, doctor, estado: pendiente/completada)
- Botón "Marcar como atendida" para cada cita
- Ver disponibilidad de doctores hoy (tarjeta con lista: doctor, horario disponible)
- Panel para actualizar signos vitales (modal con: temperatura, presión arterial, frecuencia cardíaca) – solo simulación
- Notificaciones de pacientes esperando (mock con 2-3 ejemplos)
- Calendario simple (vista día) opcional, pero no obligatorio

### 3. Requisitos comunes
- **Layout:** Similar al doctor calendar (header con título y rol, sidebar o top nav consistente)
- **Navegación:** Usar routerLink, mantener lazy loading
- **Auth guard:** Verificar que solo admin acceda a admin routes y nurse a nurse routes
- **Colores:** Teal para botones primarios, Slate para textos secundarios, fondo gris claro para cards
- **Responsive:** Grid flexible (Tailwind: `grid`, `md:grid-cols-2`, `lg:grid-cols-3`)
- **Modales:** Usar modales nativos con Tailwind (no dependencias externas)
- **Código limpio:** Componentes standalone, señales para estado, servicios separados
- **Backend ready:** Dejar `// TODO: Conectar con API` en servicios

## Estructura esperada
## RESPONSIVE