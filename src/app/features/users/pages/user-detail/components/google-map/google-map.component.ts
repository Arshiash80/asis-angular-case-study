import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-map',
  standalone: true,
  templateUrl: './google-map.component.html',
  imports: [CommonModule]
})
export class GoogleMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() address: string = '';

  private map: any;
  private marker: any;

  ngOnInit(): void {
    // Load Leaflet CSS and JS
    this.loadLeafletScripts();
  }

  ngAfterViewInit(): void {
    // Initialize map after view is ready
    if (typeof (window as any).L !== 'undefined') {
      this.initializeMap();
    } else {
      // Wait for script to load
      const checkLeaflet = setInterval(() => {
        if (typeof (window as any).L !== 'undefined') {
          clearInterval(checkLeaflet);
          this.initializeMap();
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  getGoogleMapsUrl(): string {
    if (!this.latitude || !this.longitude) {
      return '#';
    }

    // Create Google Maps URL with coordinates
    // Using the q parameter for coordinates
    return `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
  }

  private loadLeafletScripts(): void {
    if (typeof (window as any).L !== 'undefined') {
      return; // Already loaded
    }

    // Load Leaflet CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    cssLink.crossOrigin = '';
    document.head.appendChild(cssLink);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    document.head.appendChild(script);
  }

  private initializeMap(): void {
    if (!this.latitude || !this.longitude) {
      return;
    }

    const L = (window as any).L;

    // Initialize map
    this.map = L.map(this.mapContainer.nativeElement).setView([this.latitude, this.longitude], 15);

    // Add OpenStreetMap tiles (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Create custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="w-6 h-6 bg-secondary-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add marker
    this.marker = L.marker([this.latitude, this.longitude], { icon: customIcon })
      .addTo(this.map);

    // Add popup
    if (this.address) {
      this.marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold text-gray-900 text-sm">${this.address}</h3>
          <p class="text-xs text-gray-600">Lat: ${this.latitude.toFixed(4)}, Lng: ${this.longitude.toFixed(4)}</p>
        </div>
      `);
    }
  }
}
