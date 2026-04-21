import { Component } from '@angular/core';


@Component({
    selector: 'app-hero',
    imports: [],
    template: `
    <section id="inicio" class="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-20 right-0 w-96 h-96 bg-primary-200 rounded-full opacity-30 blur-3xl"></div>
      <div class="absolute bottom-20 left-0 w-72 h-72 bg-secondary-200 rounded-full opacity-30 blur-3xl"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full">
              <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-primary-700 font-semibold text-sm">Más de 20 años de experiencia</span>
            </div>
            
            <h1 class="text-5xl lg:text-6xl font-extrabold text-secondary-900 leading-tight">
              Tu Salud es Nuestra
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"> Prioridad</span>
            </h1>
            
            <p class="text-xl text-secondary-600 leading-relaxed">
              Brindamos atención médica integral con tecnología de vanguardia y un equipo de profesionales altamente calificados dedicados a tu bienestar.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn-primary flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>Reservar Cita</span>
              </button>
              <button class="btn-secondary flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Conocer Más</span>
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8">
              <div class="text-center sm:text-left">
                <div class="text-3xl font-bold text-primary-600">+15k</div>
                <div class="text-secondary-500 text-sm">Pacientes Felices</div>
              </div>
              <div class="text-center sm:text-left">
                <div class="text-3xl font-bold text-primary-600">+50</div>
                <div class="text-secondary-500 text-sm">Especialistas</div>
              </div>
              <div class="text-center sm:text-left">
                <div class="text-3xl font-bold text-primary-600">24/7</div>
                <div class="text-secondary-500 text-sm">Atención</div>
              </div>
            </div>
          </div>

          <!-- Right Content - Hero Image/Illustration -->
          <div class="relative">
            <div class="relative bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl p-8 shadow-2xl">
              <div class="bg-white rounded-2xl p-6 space-y-6">
                <!-- Medical Icon Illustration -->
                <div class="flex justify-center">
                  <div class="bg-primary-100 p-6 rounded-full">
                    <svg class="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Appointment Card -->
                <div class="space-y-3">
                  <div class="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span class="text-secondary-700 font-medium">Dr. María González</span>
                  </div>
                  <div class="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="text-secondary-700 font-medium">Lunes - Viernes</span>
                  </div>
                  <div class="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-secondary-700 font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-bounce">
              <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}
