import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { twMerge } from 'tailwind-merge';

export type ButtonSkeletonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button-skeleton',
  standalone: true,
  template: `
    <div 
      class="inline-flex w-full items-center justify-center rounded-xl animate-pulse"
      [class]="skeletonClasses()"
      role="presentation"
      [attr.aria-label]="'Loading button'">
      
      <!-- Skeleton content -->
      <div class="flex items-center justify-center gap-2">
        <!-- Text skeleton -->
        <div class="h-4 bg-gray-200 rounded" [class]="textWidthClass()"></div>
        
        <!-- Icon skeleton (if showIcon is true) -->
        <div *ngIf="showIcon()" class="w-4 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  `,
  imports: [CommonModule]
})
export class ButtonSkeletonComponent {
  // MARK: Inputs
  /**
   * Button skeleton size - sm, md, or lg
   */
  size = input<ButtonSkeletonSize>('md');

  /**
   * Whether to show icon skeleton
   */
  showIcon = input<boolean>(false);

  /**
   * Custom width for the skeleton button
   */
  width = input<string>('');

  // MARK: Computed Properties
  /**
   * Computed skeleton classes based on size
   */
  skeletonClasses = computed(() => {
    const baseClasses = 'bg-gray-200 inline-block';

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 h-8',
      md: 'px-4 py-2.5 h-10',
      lg: 'px-6 py-3 h-12'
    };

    return twMerge(
      baseClasses,
      sizeClasses[this.size()],
      this.width() || ''
    );
  });

  /**
   * Computed text width class
   */
  textWidthClass = computed(() => {
    const widthClasses = {
      sm: 'w-16',
      md: 'w-20',
      lg: 'w-24'
    };

    return widthClasses[this.size()];
  });
}
