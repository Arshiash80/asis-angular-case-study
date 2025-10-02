import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html'
})
export class UsersComponent {
  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
