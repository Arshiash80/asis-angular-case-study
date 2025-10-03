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
import { FooterComponent } from '../../../../shared/ui/footer/footer.component';


@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  imports: [CommonModule, UserCardComponent, UserCardSkeletonComponent, SearchBarComponent, ButtonComponent, FooterComponent]
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

  /**
   * computed signal that returns all users from the service
   */
  allUsers = computed(() => this.usersResult() || []);

  /**
   * computed signal that returns filtered users based on search query
   */
  users = computed(() => {
    const allUsers = this.allUsers();
    //? Trim and lowercase the search query
    const query = this.searchQuery().trim().toLowerCase();

    // If no query, return all users
    if (!query) {
      return allUsers;
    }

    // Filter users based on search query by name, email, city, or company name
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

  // MARK: Properties
  // Skeleton array for loading state
  skeletonArray = Array(10).fill(0);

  // MARK: Methods 
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
  goHome(): void {
    this.router.navigate(['/']);
  }
  retry(): void {
    window.location.reload();
  }
  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }
  onSearchClear(): void {
    this.searchQuery.set('');
  }


}