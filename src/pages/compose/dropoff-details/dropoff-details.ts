import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RepeatPage } from '../repeat/repeat';

@Component({
  selector: 'dropoff-details',
  templateUrl: 'dropoff-details.html'
})
export class DropoffDetailsPage implements OnInit {
  public requests:FirebaseListObservable<any>;
  private dropoffForm: FormGroup;
  public request: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    @Inject(FormBuilder) public formBuilder: FormBuilder) {
    this.request = navParams.get('request');
    this.afAuth.authState.subscribe(auth => {
      if(auth)
        this.requests = afDatabase.list(`/requests/${auth.uid}/outbox`);
    });
  }

  ngOnInit() {
    this.dropoffForm = this.formBuilder.group({
      date: [this.request.dropoff.date, Validators.required],
      time: [this.request.dropoff.time, Validators.required],
      location: [this.request.dropoff.location, Validators.required]
    });
  }

  validateLocation() {
    var locationControl = this.dropoffForm.controls.location;
    return locationControl.valid || locationControl.untouched
  }

  nextStep(){
    this.request.dropoff.date = this.dropoffForm.value.date;
    this.request.dropoff.time = this.dropoffForm.value.time;
    this.request.dropoff.location = this.dropoffForm.value.location;
    this.navCtrl.push(RepeatPage, {request: this.request })
  }

}
