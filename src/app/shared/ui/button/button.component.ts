import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outlined';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [CommonModule],
  host: {
    class: 'inline-block'
  }
})
export class ButtonComponent {
  // MARK: Inputs
  /**
   * Button variant
   * 
   * - primary: Brand colored button
   * - secondary: Secondary colored button
   * - ghost: Transparent button with text color
   * - outlined: Outlined button with border
   */
  variant = input<ButtonVariant>('primary');

  /**
   * Button size - sm, md, or lg
   */
  size = input<ButtonSize>('md');

  /**
   * Whether the button is disabled
   */
  disabled = input<boolean>(false);

  /**
   * Whether the button is in loading state
   */
  loading = input<boolean>(false);

  /**
   * Button type attribute
   */
  type = input<ButtonType>('button');

  /**
   * ARIA label for accessibility
   */
  ariaLabelInput = input<string>('');

  /**
   * Icon path for the button (SVG path)
   */
  icon = input<string>('');

  /**
   * Icon position - left or right
   */
  iconPosition = input<IconPosition>('right');

  // MARK: Outputs
  /**
   * Click event emitter
   */
  onClick = output<Event>();

  // MARK: Computed Properties
  /**
   * Computed button classes based on variant, size, and state
   */
  buttonClasses = computed(() => {
    const baseClasses = 'group cursor-pointer w-full inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm gap-1',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2'
    };

    // Variant classes
    const variantClasses = {
      primary: 'bg-brand-primary text-secondary-500 hover:bg-primary-500 focus:ring-brand-primary shadow-sm hover:shadow-md',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm hover:shadow-md',
      ghost: 'bg-transparent text-text-primary hover:bg-gray-100 focus:ring-gray-300 hover:text-text-primary',
      outlined: 'bg-transparent text-secondary-500 border border-secondary-500 hover:bg-secondary-500 hover:text-white focus:ring-secondary-500'
    };

    return twMerge(
      baseClasses,
      sizeClasses[this.size()],
      variantClasses[this.variant()]
    );
  });

  /**
   * Computed ARIA label with fallback
   */
  ariaLabel = computed(() => {
    return this.ariaLabelInput() || 'Button';
  });
}