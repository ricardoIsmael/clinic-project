import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
