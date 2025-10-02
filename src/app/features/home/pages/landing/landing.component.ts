import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Calculator } from '../../../../core/services/calculator.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [ButtonComponent]
})
export class LandingComponent {
  private calculator = inject(Calculator);

  totalCost = computed(() => this.calculator.add(40, 20));

  constructor(private router: Router) { }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
