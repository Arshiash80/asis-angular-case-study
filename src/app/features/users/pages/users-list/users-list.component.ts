import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { UserService } from '../../data-access/user.service';
import { User } from '../../data-access/models/user.model';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCardSkeletonComponent } from './components/user-card/user-card-skeleton/user-card-skeleton.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';


@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  imports: [CommonModule, UserCardComponent, UserCardSkeletonComponent, SearchBarComponent, ButtonComponent]
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

  /**
   * signal that holds the search query
   */
  searchQuery = signal<string>('');

  // MARK: Computed signals
  /**
   * computed signal that returns all users from the service
   */
  allUsers = computed(() => this.usersResult() || []);

  /**
   * computed signal that returns filtered users based on search query
   */
  users = computed(() => {
    const allUsers = this.allUsers();
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return allUsers;
    }

    return allUsers.filter(user =>
      this.normalizeString(user.name).includes(this.normalizeString(query)) ||
      this.normalizeString(user.email).includes(this.normalizeString(query)) ||
      this.normalizeString(user.address.city).includes(this.normalizeString(query)) ||
      this.normalizeString(user.company.name).includes(this.normalizeString(query))
    );
  });

  /**
   * computed signal that returns the loading state of the users
   */
  loading = computed(() => this.usersResult() === undefined);

  /**
   * computed signal that returns the error state of the users
   */
  error = computed(() => {
    const result = this.usersResult();
    return result !== undefined && result.length === 0 ? 'No users found' : null;
  });

  /**
   * computed signal that returns whether there are search results
   */
  hasSearchResults = computed(() => {
    const query = this.searchQuery().trim();
    return query.length > 0 && this.users().length > 0;
  });

  /**
   * computed signal that returns whether search has no results
   */
  hasNoSearchResults = computed(() => {
    const query = this.searchQuery().trim();
    return query.length > 0 && this.users().length === 0 && !this.loading();
  });

  // Skeleton array for loading state
  skeletonArray = Array(6).fill(0); // Show 6 skeleton cards for cleaner look

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

  /**
   * method that handles search query changes from the search bar component
   */
  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  /**
   * method that handles search clear from the search bar component
   */
  onSearchClear(): void {
    this.searchQuery.set('');
  }

  /**
   * method that normalizes strings for localized search
   * Removes accents and special characters for better search matching
   */
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .trim();
  }
}