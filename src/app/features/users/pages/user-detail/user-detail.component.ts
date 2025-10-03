import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { UserService } from '../../data-access/user.service';
import { UserDetailContentComponent } from './components/user-detail-content/user-detail-content.component';
import { UserDetailSkeletonComponent } from './components/user-detail-skeleton/user-detail-skeleton.component';
import { FooterComponent } from '../../../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  imports: [CommonModule, UserDetailContentComponent, UserDetailSkeletonComponent, FooterComponent]
})
export class UserDetailComponent {
  // MARK: Injectables
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // MARK: Signals
  private userSource = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/users']);
        return of(null);
      }
      return this.userService.getUser(id).pipe(
        catchError(() => of(null))
      );
    })
  );

  private userSignal = toSignal(this.userSource, {
    initialValue: undefined
  });


  // MARK: Computed signals
  user = computed(() => this.userSignal());
  /**
   * computed signal that returns the loading state of the user
   */
  loading = computed(() => this.userSignal() === undefined);
  /**
   * computed signal that returns the error state of the user
   */
  error = computed(() => !this.loading() && this.user() === null ? 'User not found' : null);

  // MARK: Methods
  /**
   * method that navigates to the users list page
   */
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
