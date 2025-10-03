import { Component, Input, Output, EventEmitter, signal, OnInit, input, output } from '@angular/core';
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
  placeholder = input<string>('Search...');
  /**
   * Help text displayed below the search input
   */
  helpText = input<string>('');
  initialValue = input<string>('');
  showClearButton = input<boolean>(true);
  inputClasses = input<string>('');

  // MARK: Outputs
  /**
   * Emits when the search query changes
   */
  searchChange = output<string>();

  /**
   * Emits when the search is cleared
   */
  searchClear = output<void>();

  // MARK: Signals
  /**
   * Internal search query signal
   */
  searchQuery = signal<string>('');


  // MARK: Methods
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.searchQuery.set(value);
    this.searchChange.emit(value);
  }
  clearSearch(): void {
    this.searchQuery.set('');
    this.searchClear.emit();
  }
  getSearchValue(): string {
    return this.searchQuery();
  }

  // MARK: Lifecycle
  ngOnInit(): void {
    if (this.initialValue) {
      this.searchQuery.set(this.initialValue());
    }
  }
}
