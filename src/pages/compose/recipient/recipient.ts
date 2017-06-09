import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChildrenPage } from '../children/children';
import { IRequest } from '../../../shared/request.model'
import { requestInit } from "./request.object";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'recipient',
  templateUrl: 'recipient.html'
})
export class RecipientPage implements OnInit {
  public request: IRequest = requestInit;
  private recipientForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    @Inject(FormBuilder) public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recipientForm = this.formBuilder.group({
      name: [this.request.receiverName, Validators.required],
      email: [this.request.receiverEmail, [Validators.email, Validators.required]]
    });
  }

  validateName() {
    var nameControl = this.recipientForm.controls.name;
    return nameControl.valid || nameControl.untouched
  }

  validateEmail() {
    var emailControl = this.recipientForm.controls.email;
    return emailControl.valid || emailControl.untouched
  }

  userNotFoundAlert() {
    let alert = this.alertCtrl.create({
      title: 'User Not Found',
      message: 'The email address you entered did not match any user.',
      buttons: ['OK']
    });
    alert.present();
  }

  continue() {
    this.request.receiverName = this.recipientForm.value.name;
    this.request.receiverEmail = this.recipientForm.value.email;
    this.navCtrl.push(ChildrenPage, {request: this.request })
  }

  nextStep() {
    this.afAuth.auth.fetchProvidersForEmail(this.recipientForm.value.email)
      .then(result => {
        if (result.length > 0)
          this.continue();
        else
          this.userNotFoundAlert();
      });
  }
}
