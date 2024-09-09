import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Import Point for geometry
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private latitude: number | any;
  private longitude: number | any;

  constructor() {}

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    // this.longitude = 110.377862
    // this.latitude = -7.7701778

    const map = new Map({
      basemap: 'topo-vector'
    });

    const view = new MapView({
      container: 'container',
      map: map,
      zoom: 15,
      center: [this.longitude, this.latitude]
    });

    // Create a Point geometry for the user's location
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    // Create a symbol for the point (marker)
    const markerSymbol = {
      type: 'simple-marker',
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255],  // White
        width: 2
      }
    };

    // Create a graphic and add it to the view
    const pointGraphic = new Graphic({
      geometry: point, // Use the Point object here
      symbol: markerSymbol
    });

    // Add the marker to the map view
    view.graphics.add(pointGraphic);
  }
}
