import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker';

declare let google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords?: any;
  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              public location: LocationTracker) {

  }

  ionViewDidLoad(){
    this.loadMap();
    this.addLocationInfo();
  }
  addLocationInfo() {
    this.location.getPosition().then(resp => {
      this.coords = resp.coords.coords;
      this.coords.city = resp.geocoder.city;
    });
  }
  addMarker(latLng){
    let marker = new google.maps.Marker({
      position: latLng,
      title: 'You Are here!'
    });
    marker.setMap(this.map);
    let infowindow = new google.maps.InfoWindow({
      content: "<span>You Are here!</span>"
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map,marker);
    });
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker(latLng);
    }, (err) => {
      console.log(err);
    });

  }
}
