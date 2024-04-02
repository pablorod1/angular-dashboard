import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrl: './poi.component.css',
})
export class PoiComponent implements AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  showHospitalMarkers = false;
  showHotelsMarkers = false;
  showSupermarketsMarkers = false;
  activeMarker: any;
  markerHospitalOptions!: google.maps.MarkerOptions;
  markerHotelsOptions!: google.maps.MarkerOptions;
  markerSupermarketsOptions!: google.maps.MarkerOptions;

  // Google Map
  center = { title: '', lat: 38.385255975420314, lng: -0.4311613386245738 };
  zoom = 12;
  display?: google.maps.LatLngLiteral;

  ngAfterViewInit() {

      this.markerHospitalOptions = {
        draggable: false,
        icon: '../../../assets/icons/hospital-icon.svg',
      };
      this.markerHotelsOptions = {
        draggable: false,
        icon: '../../../assets/icons/hotel-icon.svg',
      };
      this.markerSupermarketsOptions = {
        draggable: false,
        icon: '../../../assets/icons/supermarket-icon.svg',
      };

  }
  markerHospitalPositions = [
    {
      title: 'Hospital General Universitario de Alicante',
      address: 'Pintor Baeza, 11, 03010 Alicante',
      image: '../../../assets/maps-images/hospital-general.webp',
      lat: 38.36357571911017,
      lng: -0.4860734317350155,
    }, // Hospital General Universitario de Alicante
    {
      title: 'Hospital Universitario San Juan de Alicante',
      address: "Ctra. Nacional 332, s/n, 03550 Sant Joan d'Alacant, Alicante",
      image: '../../../assets/maps-images/hospital-sanjuan.webp',
      lat: 38.38930615927992,
      lng: -0.43543038940606305,
    }, // Hospital Universitario San Juan de Alicante
    {
      title: 'HLA Clínica Vistahermosa',
      address: 'Avinguda de Dénia, 103, 03015 Alacant, Alicante',
      image: '../../../assets/maps-images/hla-vistahermosa.webp',
      lat: 38.36346527843936,
      lng: -0.46404871164035866,
    }, // HLA Clínica Vistahermosa
    {
      title: 'Hospital San Vicente del Raspeig',
      address: 'Lillo Juan, 137, 03690 Sant Vicent del Raspeig, Alicante',
      image: '../../../assets/maps-images/hospital-sanvicente.webp',
      lat: 38.404153850859686,
      lng: -0.530838588314908,
    }, // Hospital San Vicente del Raspeig
    {
      title: 'Hospital Perpetuo Socorro',
      address: 'Pl. Dr. Gómez Ulla, 15, 03013 Alacant, Alicante',
      image: '../../../assets/maps-images/perpetuosocorro.webp',
      lat: 38.35270593168595,
      lng: -0.4761340998879885,
    }, // Hospital Perpetuo Socorro
  ];
  markerHotelsPositions = [
    {
      title: 'Hotel Melia Alicante',
      address: 'Pl. Prta del Mar, 3, 03001 Alicante, España',
      image: '../../../assets/maps-images/hotelmelia.webp',
      lat: 38.343056796313874,
      lng: -0.4786619894076725,
    }, // Hotel Melia Alicante
    {
      title: 'Hotel Port Alicante City & Beach',
      address: 'Av de Cataluña, 20, 03540 Alicante',
      image: '../../../assets/maps-images/hotel-port-alicante.webp',
      lat: 38.36504015231851,
      lng: -0.4174405875551504,
    }, // Hotel Port Alicante City & Beach
    {
      title: 'Hotel Maya Alicante',
      address: 'Calle Canónigo Manuel Penalva, 2, 03002 Alicante',
      image: '../../../assets/maps-images/hotelmaya.webp',
      lat: 38.352203959236554,
      lng: -0.4744611028994664,
    }, // Hotel Maya Alicante
    {
      title: 'Hotel NH Alicante',
      address: 'Calle México, 18, 03008 Alicante',
      image: '../../../assets/maps-images/hotelnh.webp',
      lat: 38.33656328188465,
      lng: -0.5072287317359496,
    }, // Hotel NH Alicante
    {
      title: 'Hotel Boutique Calas de Alicante',
      address: 'Calle Pintor Gisbert, 46, 03012 Alicante',
      image: '../../../assets/maps-images/hotelboutique.webp',
      lat: 38.358306683351024,
      lng: -0.430664670019697,
    }, // Hotel Boutique Calas de Alicante
  ];
  markerSupermarketsPositions = [
    {
      title: 'Mercadona',
      address: 'Av. de la Condomina, s/n, 03016 Alacant, Alicante',
      image: '../../../assets/maps-images/mercadona-condomina.webp',
      lat: 38.3641946189421,
      lng: -0.43173755543963804,
    }, // Mercadona
    {
      title: 'Mercadona',
      address: 'Avinguda de les Nacions, 4, 03016 Alacant, Alicante',
      image: '../../../assets/maps-images/mercadona-naciones.webp',
      lat: 38.36742486292377,
      lng: -0.4189487829703931,
    }, // Mercadona
    {
      title: 'Carrefour',
      address: 'Ctra. Valencia, km. 89, 03550 San Juan, Alicante',
      image: '../../../assets/maps-images/carrefour.webp',
      lat: 38.40745045825882,
      lng: -0.4229098724725555,
    }, // Carrefour
    {
      title: 'Consum',
      address: 'C/ Jaume I, 7, 03550 Sant Joan d`Alacant, Alicante',
      image: '../../../assets/maps-images/consum.webp',
      lat: 38.39908399434634,
      lng: -0.4345144755662955,
    }, // Consum
    {
      title: 'Aldi',
      address: 'Av. de Ansaldo, 7, 03540 Alicante',
      image: '../../../assets/maps-images/aldi.webp',
      lat: 38.36752584533809,
      lng: -0.4316820702638525,
    }, // Aldi
  ];

  trackPosition(index: number, position: any): number {
    return index; // or unique identifier corresponding to the item
  }

  toggleHospitalMarkers() {
    this.showHospitalMarkers = !this.showHospitalMarkers;
    this.activeMarker = null;
    if (this.showHospitalMarkers && this.activeMarker === null) {
      this.map.googleMap?.setZoom(13);
      this.fitBoundsToMarkers();
    }
  }
  toggleHotelsMarkers() {
    this.showHotelsMarkers = !this.showHotelsMarkers;
    this.activeMarker = null;
    if (this.showHotelsMarkers && this.activeMarker === null) {
      this.map.googleMap?.setZoom(13);
      this.fitBoundsToMarkers();
    }
  }
  toggleSupermarketsMarkers() {
    this.showSupermarketsMarkers = !this.showSupermarketsMarkers;
    this.activeMarker = null;
    if (this.showSupermarketsMarkers && this.activeMarker === null) {
      this.map.googleMap?.setZoom(13);
      this.fitBoundsToMarkers();
    }
  }

  fitBoundsToMarkers() {
    const bounds = new google.maps.LatLngBounds();

    if (this.showHospitalMarkers && this.activeMarker === null) {
      this.markerHospitalPositions.forEach((position) => {
        bounds.extend(new google.maps.LatLng(position.lat, position.lng));
      });
    }

    if (this.showHotelsMarkers && this.activeMarker === null) {
      this.markerHotelsPositions.forEach((position) => {
        bounds.extend(new google.maps.LatLng(position.lat, position.lng));
      });
    }

    if (this.showSupermarketsMarkers && this.activeMarker === null) {
      this.markerSupermarketsPositions.forEach((position) => {
        bounds.extend(new google.maps.LatLng(position.lat, position.lng));
      });
    }

    // Need to wait for the map to be fully initialized
    if (
      (this.showHospitalMarkers ||
        this.showHotelsMarkers ||
        this.showSupermarketsMarkers) &&
      this.activeMarker === null
    ) {
      this.map.idle.subscribe((map) => {
        // Check if activeMarker is not null before calling fitBounds
        if (this.activeMarker === null) {
          this.map.googleMap?.fitBounds(bounds);
        }
      });
    }
  }

  onMarkerClick(marker: any) {
    this.activeMarker = marker;
    const contentString = `<div>
    <h1>${this.activeMarker.title}</h1>
    <div>
      <h3>
        ${this.activeMarker.address}
      </h3>
      <img src="${this.activeMarker.image}" alt="${this.activeMarker.title}" style="width: 100%; height: auto;object-fit:contain;" />
    </div>
  </div>`;
    this.map.googleMap?.setCenter(
      new google.maps.LatLng(marker.lat, marker.lng)
    );
    this.map.googleMap?.setZoom(16);

    this.infoWindow.options = {
      content: contentString,
      position: {
        lat: marker.lat,
        lng: marker.lng,
      },
    };
    this.infoWindow.open();
  }

  removeActiveMarker() {
    this.activeMarker = null;
    this.infoWindow.close();
    this.fitBoundsToMarkers();
  }
}
