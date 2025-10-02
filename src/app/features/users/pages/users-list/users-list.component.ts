import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html'
})
export class UsersComponent {
  private apiUrl = environment.apiUrl;
  url = signal(this.apiUrl);

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
