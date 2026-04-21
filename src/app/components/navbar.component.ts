import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    template: `
    <nav class="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="bg-primary-600 p-2 rounded-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div>
              <span class="text-2xl font-bold text-secondary-800">Clínica</span>
              <span class="text-2xl font-bold text-primary-600">Vital</span>
            </div>
          </div>
    
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#inicio" class="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Inicio</a>
            <a href="#servicios" class="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Servicios</a>
            <a href="#nosotros" class="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Nosotros</a>
            <a href="#testimonios" class="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Testimonios</a>
            <a href="#contacto" class="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Contacto</a>
            <a routerLink="/login" class="btn-primary flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4l1a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2a3 3 0 013-3l1 0"/>
              </svg>
              <span>Iniciar Sesión</span>
            </a>
          </div>
    
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            @if (!isMenuOpen) {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            }
            @if (isMenuOpen) {
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            }
          </button>
        </div>
    
        <!-- Mobile Menu -->
        @if (isMenuOpen) {
          <div class="md:hidden pb-6 space-y-4">
            <a href="#inicio" class="block text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors">Inicio</a>
            <a href="#servicios" class="block text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors">Servicios</a>
            <a href="#nosotros" class="block text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors">Nosotros</a>
            <a href="#testimonios" class="block text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors">Testimonios</a>
            <a href="#contacto" class="block text-secondary-600 hover:text-primary-600 font-medium py-2 transition-colors">Contacto</a>
            <a routerLink="/login" class="btn-primary w-full flex items-center justify-center space-x-2 mt-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4l1a3 3 0 013 3v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2a3 3 0 013-3l1 0"/>
              </svg>
              <span>Iniciar Sesión</span>
            </a>
          </div>
        }
      </div>
    </nav>
    `
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
