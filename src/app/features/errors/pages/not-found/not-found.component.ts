import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { FooterComponent } from '../../../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  imports: [ButtonComponent, FooterComponent]
})
export class NotFoundComponent {
  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}
