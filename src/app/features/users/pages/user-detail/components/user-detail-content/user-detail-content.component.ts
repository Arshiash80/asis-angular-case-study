import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../data-access/models/user.model';
import { GoogleMapComponent } from '../google-map/google-map.component';

@Component({
  selector: 'app-user-detail-content',
  standalone: true,
  templateUrl: './user-detail-content.component.html',
  imports: [CommonModule, GoogleMapComponent]
})
export class UserDetailContentComponent {
  @Input() user: User | null = null;
}
