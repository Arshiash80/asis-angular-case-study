import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/ui/button/button.component';
import { signal, computed } from '@angular/core';
import { Calculator } from './core/services/calculator.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  // styleUrl: "./app.component.css"
})
export class AppComponent {
  // title = 'ASIS ANGULAR CASE STUDY';
  private calculator = inject(Calculator);

  totalCost = computed(() => this.calculator.add(40, 12));

  userName = signal('pro_programmer_123');
  isValidUserId = signal(false);
  badges = signal([
    { id: 1, name: 'Badge 1' },
    { id: 2, name: 'Badge 2' },
    { id: 3, name: 'Badge 3' },
  ]);

  changeUserName = () => {
    this.userName.set('cool_coder_789');
    this.isValidUserId.set(true);
    if (
      !this.badges().find(badge => badge.name === 'Button clicked badge')
    ) {

      this.badges.update(badges => [...badges, { id: 4, name: 'Button clicked badge' }]);
    }
  }
  resetUserName = () => {
    this.userName.set('pro_programmer_123');
    this.isValidUserId.set(false);
  }

}
