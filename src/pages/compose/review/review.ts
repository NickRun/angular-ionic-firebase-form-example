import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RequestsPage } from '../../requests/requests';
import * as firebase from 'firebase';

@Component({
  selector: 'review',
  templateUrl: 'review.html'
})
export class ReviewPage {
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

  submitRequest() {
    this.request.sentDate = firebase.database.ServerValue.TIMESTAMP;
    this.requests.push(this.request)
      .then(() => {
        this.navCtrl.parent.select(0);
      })
      .catch(err => console.log(err, 'You do not have access!'));
  }

}
