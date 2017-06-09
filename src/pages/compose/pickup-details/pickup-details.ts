import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RepeatPage } from '../repeat/repeat';
import { DropoffDetailsPage } from '../dropoff-details/dropoff-details';

@Component({
  selector: 'pickup-details',
  templateUrl: 'pickup-details.html'
})
export class PickupDetailsPage implements OnInit {
  public requests:FirebaseListObservable<any>;
  public request: any;
  private pickupForm: FormGroup;
  private justPickup: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    @Inject(FormBuilder) public formBuilder: FormBuilder) {
    this.request = navParams.get('request');
    this.justPickup = navParams.get('justPickup');
    this.afAuth.authState.subscribe(auth => {
      if(auth)
        this.requests = afDatabase.list(`/requests/${auth.uid}/outbox`);
    });
  }

  ngOnInit() {
    this.pickupForm = this.formBuilder.group({
      date: [this.request.pickup.date, Validators.required],
      time: [this.request.pickup.time, Validators.required],
      location: [this.request.pickup.location, Validators.required]
    });
  }

  validateLocation() {
    var locationControl = this.pickupForm.controls.location;
    return locationControl.valid || locationControl.untouched
  }

  nextStep(){
    this.request.pickup.date = this.pickupForm.value.date;
    this.request.pickup.time = this.pickupForm.value.time;
    this.request.pickup.location = this.pickupForm.value.location;
    if (this.justPickup)
      this.navCtrl.push(RepeatPage, {request: this.request })
    else
      this.navCtrl.push(DropoffDetailsPage, {request: this.request })
  }

}
