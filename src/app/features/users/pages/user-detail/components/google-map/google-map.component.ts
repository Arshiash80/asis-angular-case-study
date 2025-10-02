import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var google: any;

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
    // Load Google Maps script if not already loaded
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {
    // Initialize map after view is ready
    if (typeof google !== 'undefined') {
      this.initializeMap();
    } else {
      // Wait for script to load
      const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogle);
          this.initializeMap();
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  private loadGoogleMapsScript(): void {
    if (typeof google !== 'undefined') {
      return; // Already loaded
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  private initializeMap(): void {
    if (!this.latitude || !this.longitude) {
      return;
    }

    const mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ weight: '2.00' }]
        },
        {
          featureType: 'all',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#9c9c9c' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{ color: '#f2f2f2' }]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [{ saturation: -100 }, { lightness: 45 }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#eeeeee' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#7b7b7b' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [{ visibility: 'simplified' }]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#c8d7d4' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#070707' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#ffffff' }]
        }
      ]
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Create marker
    this.marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: this.map,
      title: this.address,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#1B428A',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-2">
          <h3 class="font-semibold text-gray-900">${this.address}</h3>
          <p class="text-sm text-gray-600">Lat: ${this.latitude}, Lng: ${this.longitude}</p>
        </div>
      `
    });

    this.marker.addListener('click', () => {
      infoWindow.open(this.map, this.marker);
    });
  }
}
