import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgIf, FormsModule],
  template: `
    <section id="contacto" class="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-primary-700 font-semibold text-sm">Contáctanos</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
            Estamos para <span class="text-primary-600">Ayudarte</span>
          </h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            Agenda tu cita o resuelve tus dudas. Estamos aquí para atenderte
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold text-secondary-900 mb-6">Solicita tu Cita</h3>
              
              <form (submit)="onSubmit($event)" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-secondary-700 font-semibold mb-2">Nombre Completo</label>
                    <input type="text" 
                           [(ngModel)]="formData.name" 
                           name="name"
                           required
                           class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                           placeholder="Tu nombre">
                  </div>
                  <div>
                    <label class="block text-secondary-700 font-semibold mb-2">Teléfono</label>
                    <input type="tel" 
                           [(ngModel)]="formData.phone" 
                           name="phone"
                           required
                           class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                           placeholder="+1 234 567 8900">
                  </div>
                </div>

                <div>
                  <label class="block text-secondary-700 font-semibold mb-2">Correo Electrónico</label>
                  <input type="email" 
                         [(ngModel)]="formData.email" 
                         name="email"
                         required
                         class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                         placeholder="tu@email.com">
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-secondary-700 font-semibold mb-2">Especialidad</label>
                    <select [(ngModel)]="formData.specialty" 
                            name="specialty"
                            required
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                      <option value="">Selecciona una especialidad</option>
                      <option value="cardiologia">Cardiología</option>
                      <option value="general">Medicina General</option>
                      <option value="pediatria">Pediatría</option>
                      <option value="laboratorio">Laboratorio Clínico</option>
                      <option value="radiologia">Radiología</option>
                      <option value="dermatologia">Dermatología</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-secondary-700 font-semibold mb-2">Fecha Preferida</label>
                    <input type="date" 
                           [(ngModel)]="formData.date" 
                           name="date"
                           required
                           class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-secondary-700 font-semibold mb-2">Mensaje (Opcional)</label>
                  <textarea [(ngModel)]="formData.message" 
                            name="message"
                            rows="4"
                            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            placeholder="Cuéntanos más sobre tu consulta..."></textarea>
                </div>

                <button type="submit" 
                        class="btn-primary w-full flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>Solicitar Cita</span>
                </button>
              </form>

              <!-- Success Message -->
              <div *ngIf="showSuccess" 
                   class="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                ¡Tu solicitud ha sido enviada! Te contactaremos pronto.
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold text-secondary-900 mb-6">Información de Contacto</h3>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="bg-primary-100 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 mb-1">Dirección</h4>
                    <p class="text-secondary-600">Av. Principal #123, Ciudad</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-primary-100 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 mb-1">Teléfono</h4>
                    <p class="text-secondary-600">+1 234 567 8900</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-primary-100 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 mb-1">Email</h4>
                    <p class="text-secondary-600">contacto&#64;clinicavital.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="bg-primary-100 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 mb-1">Horario</h4>
                    <p class="text-secondary-600">Lun - Vie: 8:00 AM - 8:00 PM</p>
                    <p class="text-secondary-600">Sáb: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Emergency Card -->
            <div class="bg-red-500 rounded-2xl p-8 text-white">
              <div class="flex items-center space-x-3 mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h3 class="text-xl font-bold">Emergencias</h3>
              </div>
              <p class="mb-4 opacity-90">Disponible 24/7 para urgencias</p>
              <a href="tel:+1234567890" class="text-2xl font-bold hover:underline">
                +1 234 567 8900
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  formData = {
    name: '',
    phone: '',
    email: '',
    specialty: '',
    date: '',
    message: ''
  };

  showSuccess = false;

  onSubmit(event: Event) {
    event.preventDefault();
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
      this.formData = { name: '', phone: '', email: '', specialty: '', date: '', message: '' };
    }, 5000);
  }
}
