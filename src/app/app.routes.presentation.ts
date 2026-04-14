import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { ServicesComponent } from './components/services.component';
import { FeaturesComponent } from './components/features.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    FeaturesComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-services></app-services>
    <app-features></app-features>
    <app-testimonials></app-testimonials>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `
})
export class PresentationComponent {}
