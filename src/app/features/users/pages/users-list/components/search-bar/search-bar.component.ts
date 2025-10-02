import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  imports: [CommonModule, FormsModule]
})
/**
 * Reusable search bar component with localized search functionality
 */
export class SearchBarComponent implements OnInit {
  // MARK: Inputs
  /**
   * Placeholder text for the search input
   */
  @Input() placeholder: string = 'Search...';

  /**
   * Help text displayed below the search input
   */
  @Input() helpText: string = '';

  /**
   * Initial search value
   */
  @Input() initialValue: string = '';

  /**
   * Whether to show the clear button
   */
  @Input() showClearButton: boolean = true;

  /**
   * CSS classes for the search input
   */
  @Input() inputClasses: string = '';

  // MARK: Outputs
  /**
   * Emits when the search query changes
   */
  @Output() searchChange = new EventEmitter<string>();

  /**
   * Emits when the search is cleared
   */
  @Output() searchClear = new EventEmitter<void>();

  // MARK: Signals
  /**
   * Internal search query signal
   */
  searchQuery = signal<string>('');

  // MARK: Lifecycle
  ngOnInit(): void {
    if (this.initialValue) {
      this.searchQuery.set(this.initialValue);
    }
  }

  // MARK: Methods
  /**
   * Handles search input changes
   */
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.searchQuery.set(value);
    this.searchChange.emit(value);
  }

  /**
   * Clears the search input
   */
  clearSearch(): void {
    this.searchQuery.set('');
    this.searchClear.emit();
  }

  /**
   * Gets the current search value
   */
  getSearchValue(): string {
    return this.searchQuery();
  }
}
