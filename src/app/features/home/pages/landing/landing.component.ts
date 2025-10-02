import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [ButtonComponent]
})
export class LandingComponent {
  private router = inject(Router);

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
