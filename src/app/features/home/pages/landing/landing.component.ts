import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Calculator } from '../../../../core/services/calculator.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  private calculator = inject(Calculator);

  totalCost = computed(() => this.calculator.add(40, 20));

  constructor(private router: Router) { }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
