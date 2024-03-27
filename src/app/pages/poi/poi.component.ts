import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrl: './poi.component.css',
})
export class PoiComponent implements AfterViewInit{
  @ViewChild(GoogleMap) map!: GoogleMap;
  showHospitalMarkers = false;
  activeMarker: any = null;
  markerHospitalOptions!: google.maps.MarkerOptions;
  // Google Map
  center = { lat: 38.385255975420314, lng: -0.4311613386245738 };
  zoom = 12;
  display?: google.maps.LatLngLiteral;
  ngAfterViewInit() {
    this.markerHospitalOptions = {
      draggable: false,
      icon: {
        url: '../../../assets/h-circle-fill.svg',
      }
    };

  }
  markerHospitalPositions = [
    // Replace these with the actual coordinates for each hospital
    { lat: 38.36357571911017, lng: -0.4860734317350155 }, // Hospital General Universitario de Alicante
    { lat: 38.38930615927992, lng: -0.43543038940606305 }, // Hospital Universitario San Juan de Alicante
    { lat: 38.364517315411696, lng: -0.46221061045565515 }, // Hospital Clínica Benidorm
    { lat: 38.404153850859686, lng: -0.530838588314908 }, // Hospital Universitario San Vicente del Raspeig
    { lat: 38.35275827611593, lng: -0.47615546057137914 }, // Hospital Perpetuo Socorro
  ];
  trackPosition(index: number, position: any): number {
    return index; // or unique identifier corresponding to the item
  }

  toggleHospitalMarkers() {
    this.showHospitalMarkers = !this.showHospitalMarkers;
    if (this.showHospitalMarkers) {
      this.fitBoundsToMarkers();
    }
  }
  fitBoundsToMarkers() {
    const bounds = new google.maps.LatLngBounds();

    this.markerHospitalPositions.forEach((position) => {
      bounds.extend(new google.maps.LatLng(position.lat, position.lng));
    });
    // Need to wait for the map to be fully initialized
    this.map.idle.subscribe((map) => {
      this.map.googleMap?.fitBounds(bounds);
    });
  }
  onMarkerClick(marker: any) {
    this.activeMarker = marker;
    this.map.googleMap?.setCenter(new google.maps.LatLng(marker.lat, marker.lng));
    this.map.googleMap?.setZoom(16);

  }
}
