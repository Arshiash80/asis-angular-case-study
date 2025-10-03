import { Component, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../../data-access/models/user.model';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { UserCardSkeletonComponent } from './user-card-skeleton/user-card-skeleton.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  imports: [CommonModule, ButtonComponent, UserCardSkeletonComponent]
})
/**
 * user card component that displays a user's information in a card format for listing users
 */
export class UserCardComponent {
  // MARK: Injectables
  /**
   * injectable that navigates to the user detail page
   */
  private router = inject(Router);

  // MARK: Inputs
  /**
   * input that receives the user from the parent component
   */
  user = input<User | null>(null);


  // MARK: Methods
  /**
   * method that navigates to the user detail page
   */
  viewUser(userId: number): void {
    this.router.navigate(['/users', userId]);
  }
}