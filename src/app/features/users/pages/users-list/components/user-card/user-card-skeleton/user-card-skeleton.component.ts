import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSkeletonComponent } from '../../../../../../../shared/ui/button/button-skeleton.component';

@Component({
  selector: 'app-user-card-skeleton',
  standalone: true,
  templateUrl: './user-card-skeleton.component.html',
  imports: [CommonModule, ButtonSkeletonComponent]
})
export class UserCardSkeletonComponent { }