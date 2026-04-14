import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NgFor],
  template: `
    <section id="nosotros" class="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Why Choose Us -->
        <div class="mb-20">
          <div class="text-center mb-16">
            <div class="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-primary-700 font-semibold text-sm">¿Por qué elegirnos?</span>
            </div>
            <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Comprometidos con tu <span class="text-primary-600">Bienestar</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let feature of features" 
                 class="card-hover bg-white rounded-2xl p-8 text-center shadow-lg">
              <div class="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="feature.icon">
                </svg>
              </div>
              <h3 class="text-xl font-bold text-secondary-900 mb-3">{{feature.title}}</h3>
              <p class="text-secondary-600">{{feature.description}}</p>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div>
          <div class="text-center mb-16">
            <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Nuestro <span class="text-primary-600">Equipo</span> Médico
            </h2>
            <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
              Profesionales altamente calificados dedicados a tu salud
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let member of team" 
                 class="card-hover bg-white rounded-2xl overflow-hidden shadow-lg">
              <div class="bg-gradient-to-br from-primary-400 to-primary-600 h-64 flex items-center justify-center">
                <svg class="w-32 h-32 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-secondary-900 mb-1">{{member.name}}</h3>
                <p class="text-primary-600 font-medium">{{member.role}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
      title: 'Tecnología Avanzada',
      description: 'Equipos médicos de última generación para diagnósticos precisos.'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      title: 'Atención 24/7',
      description: 'Disponibles las 24 horas para emergencias y urgencias médicas.'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      title: 'Seguridad Garantizada',
      description: 'Protocolos estrictos de seguridad y protección del paciente.'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
      title: 'Equipo Experto',
      description: 'Más de 50 especialistas con amplia experiencia profesional.'
    }
  ];

  team: TeamMember[] = [
    { name: 'Dra. María González', role: 'Cardiología', image: '' },
    { name: 'Dr. Carlos Rodríguez', role: 'Medicina General', image: '' },
    { name: 'Dra. Ana Martínez', role: 'Pediatría', image: '' },
    { name: 'Dr. Luis Hernández', role: 'Dermatología', image: '' }
  ];
}
