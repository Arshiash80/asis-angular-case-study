import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail-skeleton',
  standalone: true,
  template: `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <!-- MARK: Header Skeleton -->
      <div class="bg-gray-200 px-8 py-12">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div class="flex-1">
            <div class="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-5 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- MARK: Content Skeleton -->
      <div class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information Skeleton -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-5 h-5 bg-gray-300 rounded"></div>
              <div class="h-6 bg-gray-300 rounded w-48"></div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-64"></div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-48"></div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          <!-- Address Information Skeleton -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-5 h-5 bg-gray-300 rounded"></div>
              <div class="h-6 bg-gray-300 rounded w-24"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 rounded w-48"></div>
              <div class="h-4 bg-gray-300 rounded w-32"></div>
              <div class="h-4 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
        </div>

        <!-- Company Information Skeleton -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-5 h-5 bg-gray-300 rounded"></div>
            <div class="h-6 bg-gray-300 rounded w-36"></div>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <div class="h-5 bg-gray-300 rounded w-48 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule]
})
export class UserDetailSkeletonComponent { }
