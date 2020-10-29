import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapRef', { static: true }) mapRef;

  constructor() {}

  ngOnInit() {
    const latLng = this.coords.split(',');
    const latitude = Number(latLng[0]);
    const longitude = Number(latLng[1]);

    mapboxgl.accessToken =
      'pk.eyJ1IjoibXVzaXRvIiwiYSI6ImNrYThkeHA4eTA3cXgyeHM5YnZ5NmdoZXkifQ.riGba6_6Y5MWyeUCDD4pxQ';
    const map = new mapboxgl.Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }
}
