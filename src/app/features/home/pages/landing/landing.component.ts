import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { FooterComponent } from '../../../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [ButtonComponent, FooterComponent]
})
export class LandingComponent {
  // MARK: Injectables
  private router = inject(Router);

  // MARK: Methods
  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
