import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PickupDetailsPage } from '../pickup-details/pickup-details';
import { DropoffDetailsPage } from '../dropoff-details/dropoff-details';

@Component({
  selector: 'exchange-type',
  templateUrl: 'exchange-type.html'
})
export class ExchangeTypePage {
  public requests:FirebaseListObservable<any>;
  public request: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase) {
    this.request = navParams.get('request');
    this.afAuth.authState.subscribe(auth => {
      if(auth)
        this.requests = afDatabase.list(`/requests/${auth.uid}/outbox`);
    });
  }

  nextStep() {
  if (this.request.exchangeType === 'both')
    this.navCtrl.push(PickupDetailsPage, { request: this.request })
  else if (this.request.exchangeType === 'dropoff')
    this.navCtrl.push(DropoffDetailsPage, { request: this.request })
  else
    this.navCtrl.push(PickupDetailsPage, { request: this.request, justPickup: true })
  }

}
