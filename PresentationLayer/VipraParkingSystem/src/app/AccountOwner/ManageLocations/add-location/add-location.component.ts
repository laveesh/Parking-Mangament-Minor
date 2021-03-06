import { Component, OnInit } from '@angular/core';
declare const google: any;
import {LocationService} from "../../../services/AccountOwner/location.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.sass']
})
export class AddLocationComponent implements OnInit {

  constructor(private locationService: LocationService, private router: Router, private http: HttpClient) { }
  map;
  neLat;
  neLng;
  swLat;
  swLng;
  query;
  address;

  ngOnInit() {
  }

  rectangle: any;
  center: any = {
    lat: 39.034527,
    lng: -94.575721
  };

  // addLocation() {
  //   this.initDrawingManager(this.map);
  // }

  addNewLocation(event) {
    const locationDetails = {
      parkingLotName: event.parkingName,
      address: event.address,
      coordinates: [this.neLat, this.neLng, this.swLat, this.swLng],
      fineAmount: event.fineAmount,
      noOfLots: event.lots,
      occupied: 0,
      available: event.lots,
      permitAmount: event.permitAmount
    };

    console.log(locationDetails);

    this.locationService.addLocation(locationDetails)
      .subscribe(res => {
        this.router.navigateByUrl('listLocations');
      }, (err) => {
        console.log(err);
      });
  }

  onMapReady(map) {
    this.initDrawingManager(map);
    this.map = map;
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['rectangle'],
        fillColor: '#FF0000'
      },
      rectangleOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.RECTANGLE
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.RECTANGLE) {
        const rectangle = new google.maps.Rectangle({
          bounds: map.getBounds()
        });
        console.log("gshdgsh - "+map.getBounds());
        const bounds = rectangle.getBounds();
        this.neLat = bounds.getNorthEast().lat();
        this.neLng = bounds.getNorthEast().lng();
        this.swLat = bounds.getSouthWest().lat();
        this.swLng = bounds.getSouthWest().lng();
        console.log(this.neLat);
        console.log(this.neLng);
        console.log(this.swLat);
        console.log(this.swLng);
      }
    });
  }

  getAddress(){
    let apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.query}&key=AIzaSyBdNOvbKOsJNJFy3eni6DSl0t7JeJAd6Wo`;
    this.http.get(apiURL).subscribe(response => {
      this.address = response;
      console.log(this.address.results[0]);
      this.center.lat = this.address.results[0].geometry.location.lat;
      this.center.lng = this.address.results[0].geometry.location.lng;
    });
  }


  getPaths() {
    console.log('get path');
    if (this.rectangle) {
      const vertices = this.rectangle.getPaths().getArray()[0];
      const paths = [];
      vertices.getArray().forEach(function (xy, i) {
        // console.log(xy);
        const latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

}
