import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../data-access/models/user.model';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { UserDetailSkeletonComponent } from '../user-detail-skeleton/user-detail-skeleton.component';
@Component({
  selector: 'app-user-detail-content',
  standalone: true,
  templateUrl: './user-detail-content.component.html',
  imports: [CommonModule, GoogleMapComponent, UserDetailSkeletonComponent]
})
export class UserDetailContentComponent {
  user = input<User | null>(null);
}
