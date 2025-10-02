import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.components.html'
})
export class LandingComponent {
  constructor(private router: Router) { }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
