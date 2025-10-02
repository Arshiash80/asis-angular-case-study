import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../data-access/models/user.model';

@Component({
  selector: 'app-user-detail-content',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- User Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <span class="text-2xl font-bold">{{ user?.name?.charAt(0) }}</span>
          </div>
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ user?.name }}</h1>
            <p class="text-blue-100 text-lg">{{ user?.company?.name }}</p>
            <p class="text-blue-200">{{ user?.company?.catchPhrase }}</p>
          </div>
        </div>
      </div>

      <!-- User Information -->
      <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
              Contact Information
            </h2>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
                <span class="text-gray-600">{{ user?.email }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                  </path>
                </svg>
                <span class="text-gray-600">{{ user?.phone }}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                </svg>
                <a *ngIf="user?.website" href="https://{{ user?.website }}" target="_blank"
                  class="text-blue-600 hover:text-blue-800 transition-colors">
                  {{ user?.website }}
                </a>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Address
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600">{{ user?.address?.street }}</p>
              <p class="text-gray-600">{{ user?.address?.suite }}</p>
              <p class="text-gray-600">{{ user?.address?.city }}, {{ user?.address?.zipcode }}</p>
            </div>
          </div>
        </div>

        <!-- Company Information -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
              </path>
            </svg>
            Company Details
          </h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-2">{{ user?.company?.name }}</h3>
            <p class="text-gray-600 italic">"{{ user?.company?.catchPhrase }}"</p>
            <p class="text-gray-500 text-sm mt-2">{{ user?.company?.bs }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule]
})
export class UserDetailContentComponent {
  @Input() user: User | null = null;
}
