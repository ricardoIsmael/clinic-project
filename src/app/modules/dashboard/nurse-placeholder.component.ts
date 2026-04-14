import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurse-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
      <div class="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Nurse Dashboard</h1>
        <p class="text-gray-600 text-lg">Coming soon...</p>
      </div>
    </div>
  `
})
export class NursePlaceholderComponent {}
