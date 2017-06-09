import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage implements OnInit {
  private requestKey;
  private request: FirebaseObjectObservable<any>;  
  private localRequest;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase) {
    this.requestKey = navParams.get('requestKey');
    this.afAuth.authState.subscribe(auth => {
      if(auth)
        this.request = afDatabase.object(`/requests/${auth.uid}/outbox/${this.requestKey}`);
    });
  }

  ngOnInit() {
    this.request.subscribe(request => {
      this.localRequest = request;
    })
  }

}
