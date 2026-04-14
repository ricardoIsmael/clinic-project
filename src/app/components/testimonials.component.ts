import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor],
  template: `
    <section id="testimonios" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
            </svg>
            <span class="text-primary-700 font-semibold text-sm">Testimonios</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
            Lo que dicen nuestros <span class="text-primary-600">Pacientes</span>
          </h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">
            La satisfacción de nuestros pacientes es nuestra mejor carta de presentación
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let testimonial of testimonials" 
               class="card-hover bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100 shadow-lg">
            <!-- Stars -->
            <div class="flex space-x-1 mb-4">
              <ng-container *ngFor="let star of getStars(testimonial.rating)">
                <svg class="w-5 h-5 {{star ? 'text-yellow-400' : 'text-gray-300'}}" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </ng-container>
            </div>

            <!-- Content -->
            <p class="text-secondary-700 mb-6 leading-relaxed italic">"{{testimonial.content}}"</p>

            <!-- Author -->
            <div class="flex items-center space-x-4">
              <div class="bg-primary-200 w-12 h-12 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-secondary-900">{{testimonial.name}}</h4>
                <p class="text-secondary-500 text-sm">{{testimonial.role}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
          <h3 class="text-3xl font-bold mb-4">¿Listo para mejorar tu salud?</h3>
          <p class="text-xl mb-8 opacity-90">Únete a los miles de pacientes satisfechos que confían en nosotros</p>
          <button class="bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Agenda tu Cita Ahora
          </button>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Laura Sánchez',
      role: 'Paciente de Cardiología',
      content: 'Excelente atención desde el primer momento. El equipo médico es muy profesional y las instalaciones son de primer nivel. Totalmente recomendado.',
      rating: 5
    },
    {
      name: 'Roberto Díaz',
      role: 'Paciente de Medicina General',
      content: 'Llevo años siendo paciente y siempre me han brindado un trato excepcional. Los doctores son muy atentos y explican todo con detalle.',
      rating: 5
    },
    {
      name: 'Patricia Morales',
      role: 'Paciente de Pediatría',
      content: 'Mis hijos se sienten muy cómodos con la Dra. Martínez. El ambiente es acogedor y el personal muy amable. ¡La mejor clínica!',
      rating: 5
    }
  ];

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
