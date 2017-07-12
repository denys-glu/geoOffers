import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationTracker {

  constructor(public zone: NgZone,
              public geolocation: Geolocation,
              public nativeGeocoder: NativeGeocoder
              ) {};

  getPosition(): Promise<any> {
    return this.geolocation.getCurrentPosition().then((resp) => {
      return this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => {
          return {
            coords: resp,
            geocoder: result
          }
        })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
