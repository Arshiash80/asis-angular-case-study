import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { UserService } from '../../data-access/user.service';
import { User } from '../../data-access/models/user.model';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCardSkeletonComponent } from './components/user-card/user-card-skeleton/user-card-skeleton.component';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  imports: [CommonModule, UserCardComponent, UserCardSkeletonComponent]
})
export class UsersComponent {
  // MARK: Injectables
  private userService = inject(UserService);
  private router = inject(Router);

  // MARK: Signals
  /**
   * signal that fetches the users from the service 
   */
  private usersResult = toSignal(
    this.userService.getUsers().pipe(
      catchError(() => of([] as User[]))
    ),
    {
      // undefined as initial value to show loading state
      initialValue: undefined
    }
  );

  // MARK: Computed signals
  /**
   * computed signal that returns the users from the service
   */
  users = computed(() => this.usersResult() || []);
  /**
   * computed signal that returns the loading state of the users
   */
  /**
   * computed signal that returns the error state of the users
   */
  loading = computed(() => this.usersResult() === undefined);
  /**
   * computed signal that returns the error state of the users
   */
  error = computed(() => {
    const result = this.usersResult();
    return result !== undefined && result.length === 0 ? 'No users found' : null;
  });

  // Skeleton array for loading state
  skeletonArray = Array(8).fill(0); // Show 8 skeleton cards

  // MARK: Methods 
  /**
   * method that navigates to the home page 
   */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * method that reloads the page
   */
  retry(): void {
    window.location.reload();
  }
}