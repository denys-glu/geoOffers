import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocationTracker } from '../../providers/location-tracker';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {

  items?: any;
  city?: string;

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              public http: Http,
              public location: LocationTracker,
              private loadingCtrl: LoadingController
              ) {};

  ionViewDidLoad(){
    this.getLocation();
  }
  loader = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loaderStart(loader){
    loader.present();
  }
  loaderStop(loader){
    loader.dismiss();
  };


  doRefresh(refresher) {
    this.getLocation();
    refresher.complete();
  }
  getOffers(city) {
    this.city = city;
    if(city === 'Киев'){
      this.http.get('http://www.mocky.io/v2/5965fb41110000fc02c8f38e')
        .map(res => res.json())
        .subscribe(
          data => {
            console.log('data: ',data);
            this.items = data.data;
          },
          err => {
            console.log('err: ', err)
            this.loaderStop(this.loader);
          }
        )
    } else {
      this.http.get('http://www.mocky.io/v2/5965fba11100002503c8f390')
        .map(res => res.json())
        .subscribe(
          data => {
            console.log('data: ',data);
            this.items = data.data;
          },
          err => {
            console.log('err: ', err)
            this.loaderStop(this.loader);
          }
        )
    }

  }
  getLocation(){
    this.loaderStart(this.loader);
    this.location.getPosition().then(resp => {
      this.getOffers(resp.geocoder.city);
    });

  }

}
