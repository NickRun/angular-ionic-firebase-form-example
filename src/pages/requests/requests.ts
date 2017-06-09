import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RequestDetailsPage } from './request-details/request-details';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage {
  public requests:FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      if(auth)
        this.requests = afDatabase.list(`/requests/${auth.uid}/outbox`);
    });
  }

  openRequest(key: string) {
    this.navCtrl.push(RequestDetailsPage, { requestKey: key })
  }

}