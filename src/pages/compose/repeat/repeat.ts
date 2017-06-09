import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ReviewPage } from '../review/review';

@Component({
  selector: 'repeat',
  templateUrl: 'repeat.html'
})
export class RepeatPage implements OnInit {
  public requests:FirebaseListObservable<any>;
  public request: any;
  private repeatForm: FormGroup;

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
    this.repeatForm = this.formBuilder.group({
      repeat: ['no', Validators.required],
      occurance: [this.request.occurance, Validators.required]
    });
  }

  isRepeating() {
    if (this.repeatForm.value.repeat === 'no')
      return false
    else
      return true
  }

  nextStep(){
    let occurance = this.repeatForm.value.occurance;
    if (occurance)
      this.request.occurance = occurance;
    this.navCtrl.push(ReviewPage, {request: this.request })
  }

}
