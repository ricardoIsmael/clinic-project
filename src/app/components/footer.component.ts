import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-footer',
    imports: [FormsModule],
    template: `
    <footer class="bg-secondary-900 text-white">
      <!-- Main Footer -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand -->
          <div>
            <div class="flex items-center space-x-3 mb-6">
              <div class="bg-primary-600 p-2 rounded-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div>
                <span class="text-2xl font-bold">Clínica</span>
                <span class="text-2xl font-bold text-primary-400">Vital</span>
              </div>
            </div>
            <p class="text-gray-400 mb-6">
              Brindando atención médica de excelencia desde hace más de 20 años. Tu salud es nuestra prioridad.
            </p>
            <!-- Social Media -->
            <div class="flex space-x-4">
              <a href="#" class="bg-secondary-800 hover:bg-primary-600 p-3 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="bg-secondary-800 hover:bg-primary-600 p-3 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="bg-secondary-800 hover:bg-primary-600 p-3 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="bg-secondary-800 hover:bg-primary-600 p-3 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.464-6.233 7.464-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C11.456 23.998 11.732 24 12.017 24c6.617 0 11.983-5.367 11.983-11.988C24.002 5.367 18.644.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
    
          <!-- Quick Links -->
          <div>
            <h3 class="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul class="space-y-4">
              <li><a href="#inicio" class="text-gray-400 hover:text-primary-400 transition-colors">Inicio</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Servicios</a></li>
              <li><a href="#nosotros" class="text-gray-400 hover:text-primary-400 transition-colors">Nosotros</a></li>
              <li><a href="#testimonios" class="text-gray-400 hover:text-primary-400 transition-colors">Testimonios</a></li>
              <li><a href="#contacto" class="text-gray-400 hover:text-primary-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
    
          <!-- Services -->
          <div>
            <h3 class="text-xl font-bold mb-6">Especialidades</h3>
            <ul class="space-y-4">
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Cardiología</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Medicina General</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Pediatría</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Laboratorio Clínico</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Radiología</a></li>
              <li><a href="#servicios" class="text-gray-400 hover:text-primary-400 transition-colors">Dermatología</a></li>
            </ul>
          </div>
    
          <!-- Newsletter -->
          <div>
            <h3 class="text-xl font-bold mb-6">Boletín Informativo</h3>
            <p class="text-gray-400 mb-4">Suscríbete para recibir consejos de salud y novedades</p>
            <form (submit)="onSubscribe($event)" class="space-y-4">
              <input type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="w-full px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="Tu correo electrónico">
                <button type="submit"
                  class="w-full bg-primary-600 hover:bg-primary-700 font-semibold px-6 py-3 rounded-lg transition-colors">
                  Suscribirse
                </button>
              </form>
              @if (showSuccess) {
                <div class="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                  ¡Gracias por suscribirte!
                </div>
              }
            </div>
          </div>
        </div>
    
        <!-- Bottom Bar -->
        <div class="border-t border-secondary-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p class="text-gray-400">
                © 2026 Clínica Vital. Todos los derechos reservados.
              </p>
              <div class="flex space-x-6">
                <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">Política de Privacidad</a>
                <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">Términos de Uso</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `
})
export class FooterComponent {
  email = '';
  showSuccess = false;

  onSubscribe(event: Event) {
    event.preventDefault();
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
      this.email = '';
    }, 3000);
  }
}
