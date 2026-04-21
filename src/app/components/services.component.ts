import { Component } from '@angular/core';


interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
    selector: 'app-services',
    imports: [],
    template: `
    <section id="servicios" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-6 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clip-rule="evenodd"/>
            </svg>
            <span class="text-primary-700 font-semibold text-sm">Nuestros Servicios</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
            Especialidades <span class="text-primary-600">Médicas</span>
          </h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios médicos para cuidar de ti y tu familia
          </p>
        </div>
    
        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services; track service) {
            <div
              class="card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
              <div class="{{service.color}} w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="service.icon">
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-secondary-900 mb-3">{{service.title}}</h3>
              <p class="text-secondary-600 leading-relaxed">{{service.description}}</p>
              <a href="#contacto" class="inline-flex items-center mt-6 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                Saber más
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
    `
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
      title: 'Cardiología',
      description: 'Diagnóstico y tratamiento de enfermedades del corazón con tecnología de punta.',
      color: 'bg-red-100'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
      title: 'Medicina General',
      description: 'Atención médica integral para el cuidado preventivo y tratamiento de enfermedades.',
      color: 'bg-primary-100'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
      title: 'Pediatría',
      description: 'Cuidado especializado para los más pequeños desde recién nacidos hasta adolescentes.',
      color: 'bg-blue-100'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
      title: 'Laboratorio Clínico',
      description: 'Análisis clínicos con resultados rápidos y precisos para un diagnóstico certero.',
      color: 'bg-purple-100'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
      title: 'Radiología',
      description: 'Imágenes diagnósticas de alta resolución con equipos de última generación.',
      color: 'bg-green-100'
    },
    {
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      title: 'Dermatología',
      description: 'Tratamiento especializado para el cuidado de la piel, cabello y uñas.',
      color: 'bg-pink-100'
    }
  ];
}
